import React, { useEffect, useState } from "react";

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

export default function DashboardAdmin() {
  const [topCustomers, setTopCustomers] = useState<any[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [mostSoldProducts, setMostSoldProducts] = useState<any[]>([]);
  const [loyalCustomers, setLoyalCustomers] = useState<any[]>([]);
  const [categorySales, setCategorySales] = useState<any[]>([]);
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

  // Low Stock Products
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

  // Most Sold Products
  const getMostSoldProducts = async () => {
    try {
      const res = await fetch(
        "https://awd224062025htmlfrozonoinc.onrender.com/barroco/stats/most-sold-products"
      );
      if (!res.ok) throw new Error("Error al obtener productos más vendidos");
      const data = await res.json();
      setMostSoldProducts(data.mostSoldProducts || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Loyal Customers
  const getLoyalCustomers = async () => {
    try {
      const res = await fetch(
        "https://awd224062025htmlfrozonoinc.onrender.com/barroco/stats/top-customers"
      );
      if (!res.ok) throw new Error("Error al obtener clientes leales");
      const data = await res.json();
      setLoyalCustomers(data.topCustomers || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Category Sales
  const getCategorySales = async () => {
    try {
      const res = await fetch(
        "https://awd224062025htmlfrozonoinc.onrender.com/barroco/stats/category-sales"
      );
      if (!res.ok) throw new Error("Error al obtener ventas por categoría");
      const data = await res.json();
      setCategorySales(data.categorySales || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTopCustomers();
    getMonthlyIncome();
    getTotalSales();
    getLowStockProducts();
    getMostSoldProducts();
    getLoyalCustomers();
    getCategorySales();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Main content */}
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

        {/* Productos más vendidos */}
        <div className="bg-white p-4 shadow rounded mb-6">
          <h3 className="font-semibold text-lg mb-2">Productos Más Vendidos</h3>
          {mostSoldProducts.length > 0 ? (
            <ul className="list-disc pl-5">
              {mostSoldProducts.map((p) => (
                <li key={p._id}>{p.name} - {p.totalSold}</li>
              ))}
            </ul>
          ) : (
            <p>No hay productos más vendidos disponibles</p>
          )}
        </div>

        {/* Productos sin stock */}
        <div className="bg-white p-4 shadow rounded mb-6">
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

        {/* Clientes Leales */}
        <div className="bg-white p-4 shadow rounded mb-6">
          <h3 className="font-semibold text-lg mb-2">Clientes Más Leales</h3>
          {loyalCustomers.length > 0 ? (
            <ul className="list-disc pl-5">
              {loyalCustomers.map((c) => (
                <li key={c.customerId}>{c.name} - ${c.totalSpent}</li>
              ))}
            </ul>
          ) : (
            <p>No hay clientes leales disponibles</p>
          )}
        </div>

        {/* Ventas por Categoría */}
        <div className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold text-lg mb-2">Ventas por Categoría</h3>
          {categorySales.length > 0 ? (
            <ul className="list-disc pl-5">
              {categorySales.map((category) => (
                <li key={category.category}>
                  {category.category}: <span className="font-bold">${category.sales}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay ventas por categoría disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}
