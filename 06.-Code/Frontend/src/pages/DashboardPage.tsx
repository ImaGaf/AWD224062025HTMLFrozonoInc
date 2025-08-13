import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Simulación de productAPI.getById (reemplázalo con tu import real)
const productAPI = {
  getById: async (id: string) => {
    const res = await fetch(
      `https://awd224062025htmlfrozonoinc.onrender.com/barroco/products/${id}`
    );
    if (!res.ok) throw new Error("Error al obtener producto");
    return res.json();
  },
};

export default function Dashboard() {
  const [topCustomers, setTopCustomers] = useState<any[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Top Customers
  const getTopCustomers = async () => {
    try {
      const res = await fetch(
        "https://awd224062025htmlfrozonoinc.onrender.com/barroco/stats/top-customers"
      );
      if (!res.ok) throw new Error("Error al obtener top customers");
      const data = await res.json();
      setTopCustomers(data.topCustomers || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Monthly Income
  const getMonthlyIncome = async () => {
    try {
      const res = await fetch(
        "https://awd224062025htmlfrozonoinc.onrender.com/barroco/stats/monthly-income"
      );
      if (!res.ok) throw new Error("Error al obtener ingresos mensuales");
      const data = await res.json();
      setMonthlyIncome(data.monthlyIncome || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Total Sales
  const getTotalSales = async () => {
    try {
      const res = await fetch(
        "https://awd224062025htmlfrozonoinc.onrender.com/barroco/stats/total-sales"
      );
      if (!res.ok) throw new Error("Error al obtener ventas totales");
      const data = await res.json();
      setTotalSales(data.totalSales || 0);
    } catch (error) {
      console.error(error);
    }
  };

  // Low Stock Products con nombre
  const getLowStockProducts = async () => {
    try {
      setErrorMessage("");
      const res = await fetch(
        "https://awd224062025htmlfrozonoinc.onrender.com/barroco/stats/product/low-stock"
      );
      if (!res.ok) throw new Error("Error al obtener productos sin stock");

      const data = await res.json();
      if (!Array.isArray(data)) {
        setErrorMessage("Formato de datos inválido");
        return;
      }

      const outOfStockIds = data
        .filter((item: any) => Number(item.stock) === 0)
        .map((item: any) => item.productId);

      if (outOfStockIds.length === 0) {
        setLowStockProducts([]);
        return;
      }

      const productDetails = await Promise.all(
        outOfStockIds.map(async (id) => {
          try {
            return await productAPI.getById(id);
          } catch {
            return null;
          }
        })
      );

      const safeData = productDetails.filter((p) => p !== null);
      setLowStockProducts(safeData);
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudieron cargar los productos sin stock");
    }
  };

  useEffect(() => {
    getTopCustomers();
    getMonthlyIncome();
    getTotalSales();
    getLowStockProducts();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fijo */}
      <div className="w-60 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-lg font-bold mb-6">Menú</h2>
        <Link to="/clientes" className="mb-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
          Clientes
        </Link>
        <Link to="/empleados" className="mb-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
          Empleados
        </Link>
        <Link to="/productoscontrol" className="mb-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
          Productos
        </Link>
        <Link to="/ordenpedidos" className="mb-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded">
          Ordenes
        </Link>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold text-lg">Ventas Totales</h3>
            <p className="text-2xl font-bold text-green-600">${totalSales.toFixed(2)}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold text-lg">Top Clientes</h3>
             {topCustomers.map((c) => (
              <p key={c.idCustomer}>
                ID: {c.idCustomer} —{" "}
                Nombre: {c.firstName} {c.lastName} —{" "}
                <span className="font-bold">${c.totalSpent}</span>
              </p>
            ))}
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold text-lg">Ingresos Mensuales</h3>
            {monthlyIncome.map((m) => (
              <p key={m.month}>
                {m.month} — <span className="font-bold">${m.total}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Productos sin stock */}
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold text-lg mb-2">Productos sin stock</h3>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {lowStockProducts.length > 0 ? (
            <ul className="list-disc pl-5">
              {lowStockProducts.map((p) => (
                <li key={p._id}>{p.name}</li>
              ))}
            </ul>
          ) : (
            <p>No hay productos sin stock</p>
          )}
        </div>
      </div>
    </div>
  );
}
