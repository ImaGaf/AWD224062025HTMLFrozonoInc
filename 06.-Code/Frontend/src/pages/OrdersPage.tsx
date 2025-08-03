import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { orderAPI } from "@/lib/api";

export default function OrdersPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await orderAPI.getAll();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las órdenes",
        variant: "destructive",
      });
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Cargando órdenes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Gestión de Órdenes</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => {
                const formattedDate = order.date
                  ? new Date(order.date).toLocaleDateString()
                  : "Sin fecha";

                return (
                  <li key={order._id || order.idOrder} className="border p-4 rounded-md">
                    <p><strong>ID Orden:</strong> {order.idOrder || "Sin ID"}</p>
                    <p><strong>Productos:</strong> {order.products || "Sin productos"}</p>
                    <p><strong>Total:</strong> ${order.total ?? "N/A"}</p>
                    <p><strong>Dirección:</strong> {order.deliveryAddress || "Sin dirección"}</p>
                    <p><strong>Fecha:</strong> {formattedDate}</p>
                    <p><strong>Cliente:</strong> {order.customer || "Sin cliente"}</p>
                    <p><strong>Estatus:</strong> {order.status || "Desconocido"}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-muted-foreground">No hay órdenes registradas</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
