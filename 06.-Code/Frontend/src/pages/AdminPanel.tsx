import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CatalogSection from "@/components/CatalogSection";
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
