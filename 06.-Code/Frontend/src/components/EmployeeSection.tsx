import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { employeeAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type Employee = {
  mongoId: string; // _id real de MongoDB
  idUser: string;  // ID visible
  role: string;
  createdAt?: string;
  updatedAt?: string;
};

const EmployeeSection = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editMongoId, setEditMongoId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ idUser: string; role: string }>({
    idUser: "",
    role: "",
  });
  const { toast } = useToast();

  const fetchEmployees = async () => {
    try {
      const data = await employeeAPI.getAll();
      // Mapeamos para guardar también _id
      setEmployees(
        data.map((emp: any) => ({
          mongoId: emp._id,   // Guardamos el _id para editar/eliminar
          idUser: emp.idUser, // ID visible
          role: emp.role,
          createdAt: emp.createdAt,
          updatedAt: emp.updatedAt,
        }))
      );
    } catch (err) {
      console.error("Error al obtener empleados:", err);
      toast({ title: "Error al obtener empleados", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editMongoId) return;

    try {
      const updatedData: any = {};
      if (editForm.role) updatedData.role = editForm.role;
      updatedData.updatedAt = new Date();

      await employeeAPI.update(editMongoId, updatedData); // Usar _id
      toast({ title: "Empleado actualizado" });
      setEditMongoId(null);
      fetchEmployees();
    } catch (err) {
      console.error("Error al actualizar empleado:", err);
      toast({ title: "Error al actualizar", variant: "destructive" });
    }
  };

  const handleDeleteEmployee = async (mongoId: string) => {
    try {
      await employeeAPI.delete(mongoId); // Usar _id
      toast({ title: "Empleado eliminado" });
      fetchEmployees();
    } catch (err) {
      console.error("Error al eliminar empleado:", err);
      toast({ title: "Error al eliminar", variant: "destructive" });
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.idUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.mongoId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="font-bold mb-4">Empleados</h2>

      {/* Barra de búsqueda */}
      <Input
        type="text"
        placeholder="Buscar por ID de Usuario o _id"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {filteredEmployees.length === 0 ? (
        <div>No se encontraron empleados</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <Card key={emp.mongoId} className="w-full max-w-xs mx-auto">
              <CardHeader>
                <CardTitle>{emp.idUser}</CardTitle>
                <div className="text-xs text-gray-500">_id: {emp.mongoId}</div>
              </CardHeader>
              <CardContent>
                <div>Rol: {emp.role}</div>

                {editMongoId === emp.mongoId ? (
                  <form onSubmit={handleEditSubmit}>
                    <Input
                      placeholder="ID Usuario"
                      value={editForm.idUser}
                      disabled
                      className="mb-2"
                    />
                    <Input
                      placeholder="Rol"
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                      className="mb-2"
                    />
                    <Button type="submit">Guardar cambios</Button>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => setEditMongoId(null)}
                      className="ml-2"
                    >
                      Cancelar
                    </Button>
                  </form>
                ) : (
                  <>
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditMongoId(emp.mongoId); // Usamos _id
                        setEditForm({ idUser: emp.idUser, role: emp.role });
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteEmployee(emp.mongoId)} // Usamos _id
                    >
                      Eliminar
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeSection;
