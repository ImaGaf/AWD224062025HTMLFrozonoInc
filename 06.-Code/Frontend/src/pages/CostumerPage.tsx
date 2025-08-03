import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { customerAPI } from "@/lib/api";

interface Customer {
  _id?: string;
  idCustomer?: string;
  phone: string;
  billingAddress: string;
  __v?: number;
}

export default function CustomerPage() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState({ phone: "", billingAddress: "" });
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar todos los clientes
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await customerAPI.getAll();
      setCustomers(data);
    } catch (error) {
      toast({ title: "Error", description: "No se pudieron obtener los clientes", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;
    try {
      await customerAPI.delete(id);
      toast({ title: "Cliente eliminado", description: "El cliente fue eliminado correctamente" });
      fetchCustomers();
    } catch (error) {
      toast({ title: "Error", description: "No se pudo eliminar el cliente", variant: "destructive" });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-cornsilk via-warm to-accent p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Gestión de Clientes</CardTitle>
        </CardHeader>
        <CardContent>

          {/* Lista de Clientes */}
          <h2 className="font-bold">Lista de Clientes</h2>
          <ul className="space-y-2 mt-4">
            {customers.map((c) => (
              <li key={c._id} className="flex justify-between items-center p-2 border rounded-lg">
                <div>
                  <p><strong>ID:</strong> {c._id}</p>
                  <p><strong>Teléfono:</strong> {c.phone}</p>
                  <p><strong>Dirección:</strong> {c.billingAddress}</p>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(c._id!)}>Eliminar</Button>
                </div>
              </li>
            ))}
          </ul>
          
        </CardContent>
      </Card>
    </div>
  );
}
