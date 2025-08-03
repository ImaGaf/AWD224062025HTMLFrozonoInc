// Parte 1: Mostrar lista básica de empleados

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { employeeAPI } from "@/lib/api";

export default function EmployeePage() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<any[]>([]);

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

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Gestión de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Lista de Empleados</h2>
          <Separator className="mb-4" />
          {employees.length > 0 ? (
            <ul className="space-y-2">
              {employees.map((emp) => (
                <li key={emp._id} className="border p-3 rounded-md">
                  <p><strong>ID:</strong> {emp.idEmployee}</p>
                  <p><strong>Rol:</strong> {emp.role}</p>
                  <p><strong>ID Admin:</strong> {emp.idAdmin}</p>
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
