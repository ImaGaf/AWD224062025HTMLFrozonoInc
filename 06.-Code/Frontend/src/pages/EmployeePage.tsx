import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { employeeAPI } from "@/lib/api";

export default function EmployeePage() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    idEmployee: "",
    idUser: "",
    role: "",
    idAdmin: "",
  });

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
      setEmployees(data);
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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await employeeAPI.create(newEmployee);
      toast({ title: "Empleado creado", description: "Se ha registrado el empleado correctamente" });
      setNewEmployee({ idEmployee: "", idUser: "", role: "", idAdmin: "" });
      fetchEmployees();
    } catch {
      toast({ title: "Error", description: "No se pudo crear el empleado", variant: "destructive" });
    } finally {
      setLoading(false);
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
    <div className="min-h-screen p-6 bg-gray-100">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Gestión de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formulario para crear empleado */}
          <form onSubmit={handleCreate} className="space-y-4 mb-8">
            <div>
              <Label>ID Empleado</Label>
              <Input
                value={newEmployee.idEmployee}
                onChange={(e) => setNewEmployee({ ...newEmployee, idEmployee: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>ID Usuario</Label>
              <Input
                value={newEmployee.idUser}
                onChange={(e) => setNewEmployee({ ...newEmployee, idUser: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Rol</Label>
              <Select
                value={newEmployee.role}
                onValueChange={(value) => setNewEmployee({ ...newEmployee, role: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>ID Administrador</Label>
              <Input
                value={newEmployee.idAdmin}
                onChange={(e) => setNewEmployee({ ...newEmployee, idAdmin: e.target.value })}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear Empleado"}
            </Button>
          </form>

          <Separator className="my-6" />

          {/* Lista de empleados */}
          <h2 className="text-lg font-semibold mb-4">Lista de Empleados</h2>
          {employees.length > 0 ? (
            <ul className="space-y-4">
              {employees.map((emp) => (
                <li key={emp._id} className="border p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p><strong>ID:</strong> {emp.idEmployee}</p>
                      <p><strong>Rol:</strong> {emp.role}</p>
                      <p><strong>ID Admin:</strong> {emp.idAdmin}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setEditingEmployee({ id: emp._id, role: emp.role })}
                    >
                      Editar
                    </Button>
                  </div>

                  {editingEmployee?.id === emp._id && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-md border">
                      <Label>Nuevo Rol</Label>
                      <Select
                        value={editingEmployee.role}
                        onValueChange={(value) =>
                          setEditingEmployee({ ...editingEmployee, role: value })
                        }
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
                        <Button onClick={handleUpdate}>Guardar cambios</Button>
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
