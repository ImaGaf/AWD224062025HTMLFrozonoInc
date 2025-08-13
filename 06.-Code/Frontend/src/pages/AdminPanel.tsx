import { useState } from "react";
import { Link } from "react-router-dom";
import CatalogSection from "@/components/CatalogSection";
import DashboardAdmin from "@/components/DashboardAdmin";
import FilterSection from "@/components/FilterSection";
import AddToCartSection from "@/components/AddToCartSection";
import PaymentSection from "@/components/PaymentSection";
import RegisterProductSection from "@/components/RegisterProductSection";
import EmployeeSection from "@/components/EmployeeSection";
import StockSection from "@/components/StockSection";
import OrdersSection from "@/components/OrdersSection";
import UsersSection from "@/components/UsersSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminPanel() {
  const [currentSection, setCurrentSection] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-60 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-lg font-bold mb-6">Menú</h2>
        <Link
          to="#"
          className="mb-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          onClick={() => setCurrentSection("dashboard")}
        >
          Dashboard
        </Link>
        <Link
          to="#"
          className="mb-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
          onClick={() => setCurrentSection("catalog")}
        >
          Ver Catálogo
        </Link>
        <Link
          to="#"
          className="mb-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          onClick={() => setCurrentSection("filter")}
        >
          Filtrar Productos
        </Link>
        <Link
          to="#"
          className="mb-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded"
          onClick={() => setCurrentSection("payment")}
        >
          Pagos
        </Link>
        <Link
          to="#"
          className="mb-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          onClick={() => setCurrentSection("register")}
        >
          Registrar Producto
        </Link>
        <Link
          to="#"
          className="mb-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
          onClick={() => setCurrentSection("employee")}
        >
          CRUD Empleados
        </Link>
        <Link
          to="#"
          className="mb-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          onClick={() => setCurrentSection("stock")}
        >
          CRUD Stock
        </Link>
        <Link
          to="#"
          className="mb-2 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded"
          onClick={() => setCurrentSection("orders")}
        >
          CRUD Pedidos
        </Link>
        <Link
          to="#"
          className="mb-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded"
          onClick={() => setCurrentSection("users")}
        >
          CRUD Usuarios
        </Link>
      </div>

      <div className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Panel de Administración</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Renderiza el contenido basado en la sección seleccionada */}
            {currentSection === "dashboard" && <DashboardAdmin />}
            {currentSection === "catalog" && <CatalogSection />}
            {currentSection === "filter" && <FilterSection />}
            {currentSection === "payment" && <PaymentSection />}
            {currentSection === "register" && <RegisterProductSection />}
            {currentSection === "employee" && <EmployeeSection />}
            {currentSection === "stock" && <StockSection />}
            {currentSection === "orders" && <OrdersSection />}
            {currentSection === "users" && <UsersSection />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
