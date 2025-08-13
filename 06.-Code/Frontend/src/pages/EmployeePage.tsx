import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { employeeAPI } from "@/lib/api";
import { Link } from "react-router-dom";

export default function EmployeePage() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const [searchId, setSearchId] = useState("");
  const [searchedEmployee, setSearchedEmployee] = useState<any | null>(null);

  const [editingEmployee, setEditingEmployee] = useState<{ id: string; role: string } | null>(null);

  const roles = [
    { label: "Vendedor", value: "Ventas" },
    { label: "Atención al Cliente", value: "Atención al Cliente" },
    { label: "Jefe de Producción", value: "Jefe de Producción" },
    { label: "Encargado de Almacén", value: "Almacén" },
  ];

  const fetchEmployees = async () => {
    try {
      const data = await employeeAPI.getAll();
      setEmployees(data as any[]);
    } catch {
      toast({
        title: "Error",
        description: "No se pudieron cargar los empleados",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedEmployee(null);

    if (!searchId.trim()) return;

    try {
      const result = await employeeAPI.getById(searchId.trim()) as any;
      setSearchedEmployee(result);
      toast({ title: "Empleado encontrado", description: `Se cargaron los datos del empleado ${result._id}` });
    } catch (error) {
      console.error("Error al buscar empleado:", error);
      toast({ title: "Error", description: "Empleado no encontrado", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await employeeAPI.delete(id);
      toast({ title: "Empleado eliminado", description: "El empleado ha sido eliminado correctamente" });
      fetchEmployees();
    } catch {
      toast({ title: "Error", description: "No se pudo eliminar el empleado", variant: "destructive" });
    }
  };

  const handleUpdate = async () => {
    if (!editingEmployee) return;
    try {
      await employeeAPI.update(editingEmployee.id, { role: editingEmployee.role });
      toast({ title: "Empleado actualizado", description: "El rol fue modificado correctamente" });
      setEditingEmployee(null);
      fetchEmployees();
    } catch {
      toast({ title: "Error", description: "No se pudo actualizar el empleado", variant: "destructive" });
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-cornsilk via-warm to-accent p-6">
      <Card className="max-w-2xl mx-auto bg-card/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Gestión de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-60 bg-gray-800 text-white flex flex-col p-4">
            <h2 className="text-lg font-bold mb-6">Menú</h2>
            <Link to="/clientes" className="mb-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
              Clientes
            </Link>
            <Link to="/dashboard" className="mb-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
              Dashboard
            </Link>
            <Link to="/productoscontrol" className="mb-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
              Productos
            </Link>
            <Link to="/ordenpedidos" className="mb-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded">
              Ordenes
            </Link>
          </div>

          <form onSubmit={handleSearch} className="space-y-4 mb-6">
            <div className="space-y-2">
              <Label>Buscar Empleado por ID</Label>
              <Input
                placeholder="Ingresa el _id del empleado"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-ceramics hover:bg-ceramics/90 text-ceramics-foreground">
              Buscar
            </Button>
          </form>

          {searchedEmployee && (
            <div className="border p-4 rounded-md bg-muted mb-6">
              <h3 className="text-lg font-semibold mb-2">Resultado de la Búsqueda</h3>
              <p><strong>ID Empleado:</strong> {searchedEmployee.idEmployee || searchedEmployee._id || "No disponible"}</p>
              <p><strong>ID Usuario:</strong> {searchedEmployee.idUser || "No disponible"}</p>
              <p><strong>Rol:</strong> {searchedEmployee.role || "No asignado"}</p>
            </div>
          )}

          <Separator className="my-6" />

          <h2 className="text-lg font-semibold mb-4">Lista de Empleados</h2>
          {employees.length > 0 ? (
            <ul className="space-y-2">
              {employees.map((emp) => (
                <li key={emp._id} className="border p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p><strong>ID Empleado:</strong> {emp.idEmployee || emp._id || "No disponible"}</p>
                      <p><strong>ID Usuario:</strong> {emp.idUser || "No disponible"}</p>
                      <p><strong>Rol:</strong> {emp.role || "No asignado"}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setEditingEmployee({ id: emp._id, role: emp.role })}>
                        Editar
                      </Button>
                      <Button variant="destructive" onClick={() => handleDelete(emp._id)}>
                        Eliminar
                      </Button>
                    </div>
                  </div>

                  {editingEmployee?.id === emp._id && (
                    <div className="mt-4 p-3 border rounded-md bg-muted">
                      <h3 className="text-sm font-semibold mb-2">Actualizar Rol</h3>
                      <Select
                        value={editingEmployee.role}
                        onValueChange={(value) => setEditingEmployee({ ...editingEmployee, role: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un nuevo rol" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2 mt-3">
                        <Button className="bg-ceramics hover:bg-ceramics/90 text-ceramics-foreground" onClick={handleUpdate}>
                          Guardar cambios
                        </Button>
                        <Button variant="secondary" onClick={() => setEditingEmployee(null)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No hay empleados registrados</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
