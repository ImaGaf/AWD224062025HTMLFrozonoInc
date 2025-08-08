import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { productAPI, statsAPI } from "@/lib/api";

export default function ProductPage() {
  const { toast } = useToast();
  //const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Buscadores
  const [searchId, setSearchId] = useState(""); // buscar por _id (va a llamar a getById)
  const [searchName, setSearchName] = useState(""); // filtro local por nombre/id
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  // Edición
  const [editingProduct, setEditingProduct] = useState<{ id: string; price: number; stock: number } | null>(null);

  // ---- Helpers para cargar datos ----
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productAPI.getAll();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const getLowStockProducts = async () => {
  try {
    setErrorMessage("");
    const res = await fetch(
      `https://awd224062025htmlfrozonoinc.onrender.com/barroco/stats/product/low-stock`
    );
    if (!res.ok) throw new Error("Error al obtener productos sin stock");

    const data = await res.json();

    if (!Array.isArray(data)) {
      setErrorMessage("Formato de datos inválido");
      return;
    }

    // Filtrar solo stock 0
    const outOfStockIds = data
      .filter((item: any) => Number(item.stock) === 0)
      .map((item: any) => item.productId);

    // Si no hay, limpiar lista
    if (outOfStockIds.length === 0) {
      setProducts([]);
      return;
    }

    // Llamadas paralelas para traer info completa
    const productDetails = await Promise.all(
      outOfStockIds.map(async (id) => {
        try {
          return await productAPI.getById(id);
        } catch {
          return null;
        }
      })
    );

    // Filtrar nulos
    const safeData = productDetails.filter((p) => p !== null);

    setProducts(safeData);
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudieron cargar los productos sin stock");
    }
  };


  const fetchById = async (id: string) => {
    if (!id.trim()) {
      toast({ title: "Aviso", description: "Ingresa un _id para buscar" });
      return;
    }
    setLoading(true);
    try {
      const product = await productAPI.getById(id.trim());
      // Algunas APIs devuelven { message: '...'} en caso de no encontrado -> comprobar
      if (!product || (product as any).message) {
        toast({ title: "No encontrado", description: "Producto no encontrado", variant: "destructive" });
        setProducts([]);
      } else {
        setProducts([product]);
      }
    } catch (error) {
      console.error("Error fetching product by id:", error);
      toast({ title: "Error", description: "Producto no encontrado o error en la consulta", variant: "destructive" });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ---- Actualizar producto (price & stock) ----
  const handleUpdate = async () => {
    if (!editingProduct) return;
    setLoading(true);
    try {
      // Validaciones simples
      const price = Number(editingProduct.price);
      const stock = Number(editingProduct.stock);
      if (isNaN(price) || isNaN(stock)) {
        toast({ title: "Error", description: "Precio o stock inválido", variant: "destructive" });
        setLoading(false);
        return;
      }

      await productAPI.update(editingProduct.id, { price, stock });
      toast({ title: "Producto actualizado", description: "Cambios guardados correctamente" });

      // refrescar lista (trae todos)
      await fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      toast({ title: "Error", description: "No se pudo actualizar el producto", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar por nombre / id en memoria (cuando se muestran varios productos)
  const filteredProducts = products.filter((p) => {
    const term = searchName.trim().toLowerCase();
    if (!term) return true;
    return (
      (p.name?.toString().toLowerCase().includes(term)) ||
      (p._id?.toString().toLowerCase().includes(term)) ||
      (p.idProduct?.toString().toLowerCase().includes(term))
    );
  });

  // ---- Render ----
  return (
    <div className="min-h-screen bg-gradient-to-br from-cornsilk via-warm to-accent p-6">
      <Card className="max-w-4xl mx-auto bg-card/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Gestión de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Buscadores y botones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="md:col-span-2 flex gap-2">
              <Input
                type="text"
                placeholder="Filtrar por nombre"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Button onClick={() => { /* el filtro es reactivo, este botón solo recarga la lista */ fetchProducts(); }}>
                Recargar
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Buscar por id"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <Button onClick={() => fetchById(searchId)}>Buscar por _id</Button>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Button onClick={fetchProducts} className="bg-ceramics">Todos</Button>
            <Button onClick={getLowStockProducts} className="bg-red-500">Sin Stock</Button>
          </div>

          <Separator />

          {/* Contenido */}
          {loading ? (
            <p className="text-center my-6">Cargando productos...</p>
          ) : filteredProducts.length > 0 ? (
            <ul className="space-y-3 mt-4">
              {filteredProducts.map((product) => (
                <li
                  key={product._id}
                  className={`border p-4 rounded-md ${product.stock === 0 ? "border-red-500 bg-red-100" : "border-gray-200 bg-white"}`}
                >
                  <div className="flex gap-4">
                    {product.url ? (
                      // mostrar imagen si existe (usar optional chaining para seguridad)
                      <img src={product.url} alt={product.name ?? "producto"} className="w-20 h-20 object-cover rounded" />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-sm text-muted-foreground">Sin imagen</div>
                    )}

                    <div className="flex-1">
                      <p><strong>ID producto:</strong> {product.idProduct ?? product._id}</p>
                      <p><strong>Nombre:</strong> {product.name ?? "—"}</p>
                      <p className="text-sm text-muted-foreground"><strong>Descripción:</strong> {product.description ?? "—"}</p>
                      <p><strong>Precio:</strong> ${product.price ?? "0.00"}</p>
                      <p>
                        <strong>Stock:</strong>{" "}
                        <span className={product.stock === 0 ? "text-red-600 font-bold" : ""}>
                          {product.stock ?? 0}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col justify-between">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setEditingProduct({
                            id: product._id,
                            price: Number(product.price ?? 0),
                            stock: Number(product.stock ?? 0),
                          })
                        }
                      >
                        Editar
                      </Button>
                    </div>
                  </div>

                  {/* Panel de edición debajo del producto seleccionado */}
                  {editingProduct?.id === product._id && (
                    <div className="mt-4 p-3 border rounded-md bg-muted">
                      <h3 className="text-sm font-semibold mb-2">Actualizar Producto</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium">Precio</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={editingProduct.price}
                            onChange={(e) =>
                              setEditingProduct(prev => prev ? ({ ...prev, price: parseFloat(e.target.value) || 0 }) : null)
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Stock</label>
                          <Input
                            type="number"
                            value={editingProduct.stock}
                            onChange={(e) =>
                              setEditingProduct(prev => prev ? ({ ...prev, stock: parseInt(e.target.value) || 0 }) : null)
                            }
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button
                          className="bg-ceramics hover:bg-ceramics/90 text-ceramics-foreground"
                          onClick={handleUpdate}
                        >
                          Guardar cambios
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditingProduct(null)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground mt-6">No se encontraron productos.</p>
          )}

          <Separator className="my-6" />
        </CardContent>
      </Card>
    </div>
  );
}
