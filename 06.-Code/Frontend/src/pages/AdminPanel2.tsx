import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { productAPI, orderAPI, employeeAPI, customerAPI, cartAPI, paymentAPI } from "@/lib/api";

// Catálogo de productos
function CatalogSection() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    productAPI.getAll().then(setProducts);
  }, []);
  return (
    <div>
      <h2 className="font-bold mb-4">Catálogo de Productos</h2>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((p: any, idx: number) => (
          <Card key={p.id ?? p._id ?? idx}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Precio: ${p.price}</div>
              <div>Stock: {p.stock}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Filtrar productos
function FilterSection() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    productAPI.getAll().then(setProducts);
  }, []);
  const filtered = products.filter((p: any) => p.name?.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div>
      <h2 className="font-bold mb-4">Filtrar Productos</h2>
      <Separator />
      <Input
        placeholder="Buscar por nombre..."
        className="mt-4 mb-4"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {filtered.map((p: any, idx: number) => (
          <Card key={p.id ?? p._id ?? idx}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Precio: ${p.price}</div>
              <div>Stock: {p.stock}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Agregar productos al carrito
function AddToCartSection() {
  const [products, setProducts] = useState([]);
  const { toast } = useToast();
  useEffect(() => {
    productAPI.getAll().then(setProducts);
  }, []);
  const handleAddToCart = async (product: any) => {
    try {
      await cartAPI.create({ productId: product.id ?? product._id, quantity: 1 });
      toast({ title: "Producto agregado al carrito" });
    } catch (err) {
      toast({ title: "Error al agregar", description: String(err), variant: "destructive" });
    }
  };
  return (
    <div>
      <h2 className="font-bold mb-4">Agregar Productos al Carrito</h2>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((p: any, idx: number) => (
          <Card key={p.id ?? p._id ?? idx}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Precio: ${p.price}</div>
              <Button onClick={() => handleAddToCart(p)}>Agregar al carrito</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Pagos
function PaymentSection() {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    paymentAPI.getAll().then(setPayments);
  }, []);
  return (
    <div>
      <h2 className="font-bold mb-4">Pagos</h2>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {payments.map((p: any, idx: number) => (
          <Card key={p.id ?? p._id ?? idx}>
            <CardHeader>
              <CardTitle>Pago #{p.id ?? p._id ?? idx}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Monto: ${p.amount}</div>
              <div>Estado: {p.status}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Registrar productos y CRUD
function RegisterProductSection() {
  const [form, setForm] = useState({ name: "", price: "", stock: "", description: "", categoryId: "" });
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", stock: "", description: "", categoryId: "" });
  const { toast } = useToast();

  const fetchProducts = () => productAPI.getAll().then(setProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productAPI.create({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        description: form.description,
        categoryId: form.categoryId,
      });
      toast({ title: "Producto registrado" });
      setForm({ name: "", price: "", stock: "", description: "", categoryId: "" });
      fetchProducts();
    } catch (err) {
      toast({ title: "Error al registrar", description: String(err), variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    await productAPI.delete(id);
    toast({ title: "Producto eliminado" });
    fetchProducts();
  };

  const handleEdit = (p: any) => {
    setEditId(p.id ?? p._id);
    setEditForm({
      name: p.name,
      price: p.price,
      stock: p.stock,
      description: p.description ?? "",
      categoryId: p.categoryId ?? "",
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    await productAPI.update(editId, {
      name: editForm.name,
      price: Number(editForm.price),
      stock: Number(editForm.stock),
      description: editForm.description,
      categoryId: editForm.categoryId,
    });
    toast({ title: "Producto actualizado" });
    setEditId(null);
    fetchProducts();
  };

  return (
    <div>
      <h2 className="font-bold mb-4">Registrar/Editar/Eliminar Producto</h2>
      <Separator />
      <form className="mt-4 mb-6" onSubmit={handleSubmit}>
        <Input
          placeholder="Nombre del producto"
          className="mb-2"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        <Input
          placeholder="Precio"
          type="number"
          className="mb-2"
          value={form.price}
          onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
        />
        <Input
          placeholder="Stock"
          type="number"
          className="mb-2"
          value={form.stock}
          onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
        />
        <Input
          placeholder="Descripción"
          className="mb-2"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
        <Input
          placeholder="ID Categoría"
          className="mb-2"
          value={form.categoryId}
          onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
        />
        <Button type="submit">Registrar</Button>
      </form>
      {editId && (
        <form className="mb-6" onSubmit={handleEditSubmit}>
          <h3 className="font-semibold mb-2">Editar Producto</h3>
          <Input
            placeholder="Nombre"
            className="mb-2"
            value={editForm.name}
            onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
          />
          <Input
            placeholder="Precio"
            type="number"
            className="mb-2"
            value={editForm.price}
            onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))}
          />
          <Input
            placeholder="Stock"
            type="number"
            className="mb-2"
            value={editForm.stock}
            onChange={e => setEditForm(f => ({ ...f, stock: e.target.value }))}
          />
          <Input
            placeholder="Descripción"
            className="mb-2"
            value={editForm.description}
            onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
          />
          <Input
            placeholder="ID Categoría"
            className="mb-2"
            value={editForm.categoryId}
            onChange={e => setEditForm(f => ({ ...f, categoryId: e.target.value }))}
          />
          <Button type="submit">Guardar cambios</Button>
          <Button variant="ghost" type="button" onClick={() => setEditId(null)}>Cancelar</Button>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((p: any, idx: number) => (
          <Card key={p.id ?? p._id ?? idx}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Precio: ${p.price}</div>
              <div>Stock: {p.stock}</div>
              <Button size="sm" className="mr-2" onClick={() => handleEdit(p)}>Editar</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id ?? p._id)}>Eliminar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// CRUD Empleados
function EmployeeSection() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });
  const { toast } = useToast();

  const fetchEmployees = () => employeeAPI.getAll().then(setEmployees);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await employeeAPI.create(form);
    toast({ title: "Empleado registrado" });
    setForm({ name: "", email: "", role: "" });
    fetchEmployees();
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    await employeeAPI.delete(id);
    toast({ title: "Empleado eliminado" });
    fetchEmployees();
  };

  const handleEdit = (e: any) => {
    setEditId(e.id ?? e._id);
    setEditForm({ name: e.name, email: e.email, role: e.role });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    await employeeAPI.update(editId, editForm);
    toast({ title: "Empleado actualizado" });
    setEditId(null);
    fetchEmployees();
  };

  return (
    <div>
      <h2 className="font-bold mb-4">CRUD Empleados</h2>
      <Separator />
      <form className="mt-4 mb-6" onSubmit={handleSubmit}>
        <Input
          placeholder="Nombre"
          className="mb-2"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        <Input
          placeholder="Email"
          className="mb-2"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <Input
          placeholder="Puesto"
          className="mb-2"
          value={form.role}
          onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
        />
        <Button type="submit">Registrar</Button>
      </form>
      {editId && (
        <form className="mb-6" onSubmit={handleEditSubmit}>
          <h3 className="font-semibold mb-2">Editar Empleado</h3>
          <Input
            placeholder="Nombre"
            className="mb-2"
            value={editForm.name}
            onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
          />
          <Input
            placeholder="Email"
            className="mb-2"
            value={editForm.email}
            onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
          />
          <Input
            placeholder="Puesto"
            className="mb-2"
            value={editForm.role}
            onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}
          />
          <Button type="submit">Guardar cambios</Button>
          <Button variant="ghost" type="button" onClick={() => setEditId(null)}>Cancelar</Button>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {employees.map((e: any, idx: number) => (
          <Card key={e.id ?? e._id ?? idx}>
            <CardHeader>
              <CardTitle>{e.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Email: {e.email}</div>
              <div>Puesto: {e.role}</div>
              <Button size="sm" className="mr-2" onClick={() => handleEdit(e)}>Editar</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(e.id ?? e._id)}>Eliminar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// CRUD Stock (solo editar stock)
function StockSection() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState<number>(0);
  const { toast } = useToast();

  const fetchProducts = () => productAPI.getAll().then(setProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (p: any) => {
    setEditId(p.id ?? p._id);
    setEditStock(Number(p.stock));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    await productAPI.update(editId, { stock: Number(editStock) });
    toast({ title: "Stock actualizado" });
    setEditId(null);
    fetchProducts();
  };

  return (
    <div>
      <h2 className="font-bold mb-4">CRUD Stock</h2>
      <Separator />
      {editId && (
        <form className="mb-6" onSubmit={handleEditSubmit}>
          <h3 className="font-semibold mb-2">Editar Stock</h3>
          <Input
            placeholder="Stock"
            type="number"
            className="mb-2"
            value={editStock}
            onChange={e => setEditStock(Number(e.target.value))}
          />
          <Button type="submit">Guardar cambios</Button>
          <Button variant="ghost" type="button" onClick={() => setEditId(null)}>Cancelar</Button>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((p: any, idx: number) => (
          <Card key={p.id ?? p._id ?? idx}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Stock: {p.stock}</div>
              <Button size="sm" onClick={() => handleEdit(p)}>Editar Stock</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// CRUD Pedidos
function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const { toast } = useToast();

  const fetchOrders = () => orderAPI.getAll().then(setOrders);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    if (!id) return;
    await orderAPI.delete(id);
    toast({ title: "Pedido eliminado" });
    fetchOrders();
  };

  const handleEdit = (o: any) => {
    setEditId(o.id ?? o._id);
    setEditStatus(o.status ?? "");
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    await orderAPI.update(editId, { status: editStatus });
    toast({ title: "Pedido actualizado" });
    setEditId(null);
    fetchOrders();
  };

  return (
    <div>
      <h2 className="font-bold mb-4">CRUD Pedidos</h2>
      <Separator />
      {editId && (
        <form className="mb-6" onSubmit={handleEditSubmit}>
          <h3 className="font-semibold mb-2">Editar Estado</h3>
          <Input
            placeholder="Estado"
            className="mb-2"
            value={editStatus}
            onChange={e => setEditStatus(e.target.value)}
          />
          <Button type="submit">Guardar cambios</Button>
          <Button variant="ghost" type="button" onClick={() => setEditId(null)}>Cancelar</Button>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {orders.map((o: any, idx: number) => (
          <Card key={o.id ?? o._id ?? idx}>
            <CardHeader>
              <CardTitle>Pedido #{o.id ?? o._id ?? idx}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Cliente: {o.customerName}</div>
              <div>Total: ${o.total}</div>
              <div>Estado: {o.status}</div>
              <Button size="sm" className="mr-2" onClick={() => handleEdit(o)}>Editar</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(o.id ?? o._id)}>Eliminar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// CRUD Usuarios
function UsersSection() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const { toast } = useToast();

  const fetchUsers = () => customerAPI.getAll().then(setUsers);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await customerAPI.create(form);
    toast({ title: "Usuario registrado" });
    setForm({ firstName: "", lastName: "", email: "", phone: "" });
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    await customerAPI.delete(id);
    toast({ title: "Usuario eliminado" });
    fetchUsers();
  };

  const handleEdit = (u: any) => {
    setEditId(u.id ?? u._id);
    setEditForm({ firstName: u.firstName, lastName: u.lastName, email: u.email, phone: u.phone });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    await customerAPI.update(editId, editForm);
    toast({ title: "Usuario actualizado" });
    setEditId(null);
    fetchUsers();
  };

  return (
    <div>
      <h2 className="font-bold mb-4">CRUD Usuarios</h2>
      <Separator />
      <form className="mt-4 mb-6" onSubmit={handleSubmit}>
        <Input
          placeholder="Nombre"
          className="mb-2"
          value={form.firstName}
          onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
        />
        <Input
          placeholder="Apellido"
          className="mb-2"
          value={form.lastName}
          onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
        />
        <Input
          placeholder="Email"
          className="mb-2"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <Input
          placeholder="Teléfono"
          className="mb-2"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
        />
        <Button type="submit">Registrar</Button>
      </form>
      {editId && (
        <form className="mb-6" onSubmit={handleEditSubmit}>
          <h3 className="font-semibold mb-2">Editar Usuario</h3>
          <Input
            placeholder="Nombre"
            className="mb-2"
            value={editForm.firstName}
            onChange={e => setEditForm(f => ({ ...f, firstName: e.target.value }))}
          />
          <Input
            placeholder="Apellido"
            className="mb-2"
            value={editForm.lastName}
            onChange={e => setEditForm(f => ({ ...f, lastName: e.target.value }))}
          />
          <Input
            placeholder="Email"
            className="mb-2"
            value={editForm.email}
            onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
          />
          <Input
            placeholder="Teléfono"
            className="mb-2"
            value={editForm.phone}
            onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
          />
          <Button type="submit">Guardar cambios</Button>
          <Button variant="ghost" type="button" onClick={() => setEditId(null)}>Cancelar</Button>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {users.map((u: any, idx: number) => (
          <Card key={u.id ?? u._id ?? idx}>
            <CardHeader>
              <CardTitle>{u.firstName} {u.lastName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Email: {u.email}</div>
              <div>Teléfono: {u.phone}</div>
              <Button size="sm" className="mr-2" onClick={() => handleEdit(u)}>Editar</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(u.id ?? u._id)}>Eliminar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [tab, setTab] = useState("catalog");
  return (
    <div className="min-h-screen bg-background p-8">
      <Card>
        <CardHeader>
          <CardTitle>Panel de Administración</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="catalog">Ver Catálogo</TabsTrigger>
              <TabsTrigger value="filter">Filtrar Productos</TabsTrigger>
              <TabsTrigger value="addtocart">Agregar al Carrito</TabsTrigger>
              <TabsTrigger value="payment">Pagos</TabsTrigger>
              <TabsTrigger value="register">Registrar Producto</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="employee">CRUD Empleados</TabsTrigger>
              <TabsTrigger value="stock">CRUD Stock</TabsTrigger>
              <TabsTrigger value="orders">CRUD Pedidos</TabsTrigger>
              <TabsTrigger value="users">CRUD Usuarios</TabsTrigger>
            </TabsList>
            <TabsContent value="catalog"><CatalogSection /></TabsContent>
            <TabsContent value="filter"><FilterSection /></TabsContent>
            <TabsContent value="addtocart"><AddToCartSection /></TabsContent>
            <TabsContent value="payment"><PaymentSection /></TabsContent>
            <TabsContent value="register"><RegisterProductSection /></TabsContent>
            <TabsContent value="employee"><EmployeeSection /></TabsContent>
            <TabsContent value="stock"><StockSection /></TabsContent>
            <TabsContent value="orders"><OrdersSection /></TabsContent>
            <TabsContent value="users"><UsersSection /></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}