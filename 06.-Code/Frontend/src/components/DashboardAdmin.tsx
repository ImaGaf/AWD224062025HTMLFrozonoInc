import React, { useEffect, useState } from "react";

const API_BASE = "https://awd224062025htmlfrozonoinc-1.onrender.com/barroco";
const authHeader = {
  "Content-Type": "application/json",
  "Authorization":
    "Basic " +
    btoa(`${import.meta.env.VITE_API_USER}:${import.meta.env.VITE_API_PASS}`),
};

async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { headers: authHeader });
  if (!res.ok) throw new Error(`Error al obtener ${path}`);
  return res.json();
}

const productAPI = {
  getById: async (id: string) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      headers: authHeader,
    });
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

  useEffect(() => {
    getTopCustomers();
    getMonthlyIncome();
    getTotalSales();
    getLowStockProducts();
    getMostSoldProducts();
    getLoyalCustomers();
    getCategorySales();
  }, []);

  // API calls
  const getTopCustomers = async () => {
    try {
      const data = await apiGet("/stats/top-customers");
      setTopCustomers(data.topCustomers || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getMonthlyIncome = async () => {
    try {
      const data = await apiGet("/stats/monthly-income");
      setMonthlyIncome(data.monthlyIncome || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalSales = async () => {
    try {
      const data = await apiGet("/stats/total-sales");
      setTotalSales(data.totalSales || 0);
    } catch (error) {
      console.error(error);
    }
  };

  const getLowStockProducts = async () => {
    try {
      setErrorMessage("");
      const data = await apiGet("/stats/product/low-stock");

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

  const getMostSoldProducts = async () => {
    try {
      const data = await apiGet("/stats/most-sold-products");
      setMostSoldProducts(data.mostSoldProducts || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getLoyalCustomers = async () => {
    try {
      const data = await apiGet("/stats/top-customers");
      setLoyalCustomers(data.topCustomers || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategorySales = async () => {
    try {
      const data = await apiGet("/stats/category-sales");
      setCategorySales(data.categorySales || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Cards principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Ventas */}
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="font-semibold text-lg">Ventas Totales</h3>
            <p className="text-2xl font-bold text-green-600">
              ${totalSales.toFixed(2)}
            </p>
          </div>

          {/* Top Clientes */}
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="font-semibold text-lg">Top Clientes</h3>
            {topCustomers.length > 0 ? (
              topCustomers.map((c) => (
                <p
                  key={c.idCustomer}
                  className="text-green-600 font-bold"
                >
                  ID: {c.idCustomer} — {c.firstName} {c.lastName} — ${c.totalSpent.toFixed(2)}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No hay datos de clientes</p>
            )}
          </div>

          {/* Ingresos Mensuales */}
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="font-semibold text-lg">Ingresos Mensuales</h3>
            {monthlyIncome.map((m) => (
              <p
                key={m.month}
                className="text-green-600 font-bold"
              >
                {m.month} — ${m.total}
              </p>
            ))}
          </div>
        </div>

        {/* Productos más vendidos */}
        <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
          <h3 className="font-semibold text-lg mb-2">Productos Más Vendidos</h3>
          {mostSoldProducts.length > 0 ? (
            <ul className="list-disc pl-5">
              {mostSoldProducts.map((p) => (
                <li key={p._id}>
                  {p.name} - {p.totalSold}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay productos más vendidos</p>
          )}
        </div>

        {/* Productos sin stock */}
        <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
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
        <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
          <h3 className="font-semibold text-lg mb-2">Clientes Más Leales</h3>
          {loyalCustomers.length > 0 ? (
            loyalCustomers.map((c) => (
              <p
                key={c.idCustomer}
                className="text-green-600 font-bold"
              >
                ID: {c.idCustomer} — {c.firstName} {c.lastName} — ${c.totalSpent.toFixed(2)}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No hay clientes leales</p>
          )}
        </div>

        {/* Ventas por Categoría */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="font-semibold text-lg mb-2">Ventas por Categoría</h3>
          {categorySales.length > 0 ? (
            <ul className="list-disc pl-5">
              {categorySales.map((category) => (
                <li key={category.category}>
                  {category.category}:{" "}
                  <span className="font-bold text-gray-900">
                    ${category.sales}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay ventas por categoría</p>
          )}
        </div>
      </div>
    </div>
  );
}
