const Invoice = require('../models/Invoice');
const Product = require('../models/Product');
const CartItem = require('../models/cartItem');
const Customer = require('../models/customer');
const Order = require('../models/order');
const Payment = require('../models/payment');

const getTotalSales = async () => {
  const invoices = await Invoice.find();
  const totalSales = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  return { totalSales };
};

const getMostSoldProducts = async () => {
  const items = await CartItem.find().populate('product');
  const counts = {};
  items.forEach(item => {
    const id = item.product._id.toString();
    if (!counts[id]) counts[id] = { name: item.product.name, quantity: 0 };
    counts[id].quantity += item.quantity;
  });
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .map(([productId, data]) => ({ productId, name: data.name, quantity: data.quantity }));
  return { topProducts: sorted.slice(0, 5) };
};

const getTopCustomers = async () => {
  const orders = await Order.find();
  const map = {};
  orders.forEach(order => {
    const id = order.customer.toString();
    map[id] = (map[id] || 0) + order.total;
  });
  const sorted = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([customerId, totalSpent]) => ({ customerId, totalSpent }));
  return { topCustomers: sorted.slice(0, 5) };
};

const getCategorySales = async () => {
  const items = await CartItem.find().populate({ path: 'product', populate: { path: 'category' } });
  const map = {};
  items.forEach(item => {
    const category = item.product.category.name;
    map[category] = (map[category] || 0) + item.subtotal;
  });
  const result = Object.entries(map).map(([category, total]) => ({ category, total }));
  return { categorySales: result };
};

const getMonthlyIncome = async () => {
  const invoices = await Invoice.find();
  const map = {};
  invoices.forEach(inv => {
    const date = new Date(inv.issueDate);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    map[key] = (map[key] || 0) + inv.totalAmount;
  });
  const result = Object.entries(map).map(([month, total]) => ({ month, total }));
  return { monthlyIncome: result };
};

const getAverageTicket = async () => {
  const payments = await Payment.find();
  const total = payments.reduce((sum, p) => sum + p.amount, 0);
  return { average: total / payments.length || 0 };
};

const getPaymentMethodUsage = async () => {
  const payments = await Payment.find();
  const usage = {};
  payments.forEach(p => {
    usage[p.method] = (usage[p.method] || 0) + 1;
  });
  return { methods: Object.entries(usage).map(([method, count]) => ({ method, count })) };
};

const getDiscountAverage = async () => {
  const invoices = await Invoice.find();
  const totalDiscount = invoices.reduce((sum, inv) => sum + (inv.discount || 0), 0);
  return { averageDiscount: totalDiscount / invoices.length || 0 };
};

const getTotalTaxCollected = async () => {
  const invoices = await Invoice.find();
  const totalTax = invoices.reduce((sum, inv) => sum + (inv.tax || 0), 0);
  return { totalTax };
};

const getCartSubtotal = async (cartId) => {
  const cart = await ShoppingCart.findById(cartId).populate('items');
  const subtotal = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
  return { subtotal };
};

const getOrderProductCount = async (orderId) => {
  const order = await Order.findById(orderId).populate('items');
  const count = order.items.reduce((sum, i) => sum + i.quantity, 0);
  return { count };
};

const getAverageOrderValue = async () => {
  const orders = await Order.find();
  const total = orders.reduce((sum, o) => sum + o.total, 0);
  return { averageOrder: total / orders.length || 0 };
};

const getCustomerLastPurchase = async (customerId) => {
  const lastOrder = await Order.find({ customer: customerId })
    .sort({ date: -1 }).limit(1);
  return lastOrder.length ? { orderId: lastOrder[0]._id, date: lastOrder[0].date } : {};
};

const getCustomerTotalSpent = async (customerId) => {
  const orders = await Order.find({ customer: customerId });
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  return { totalSpent };
};

const getCustomerLoyaltyScore = async (customerId) => {
  const orders = await Order.find({ customer: customerId });
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const score = Math.min(100, orders.length * 5 + totalSpent / 10);
  return { score };
};

const getProductStockStatus = async (productId) => {
  const product = await Product.findById(productId);
  let status = 'OK';
  if (product.stock <= 0) status = 'OUT';
  else if (product.stock < 5) status = 'LOW';
  return { status };
};

const getLowStockProducts = async () => {
  const products = await Product.find({ stock: { $lt: 5 } });
  return products.map(p => ({ productId: p._id, stock: p.stock }));
};

const getProductSalesHistory = async (productId) => {
  const items = await CartItem.find({ product: productId }).populate('shoppingCart');
  const monthlySales = {};
  items.forEach(item => {
    const date = new Date(item.shoppingCart.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlySales[key] = (monthlySales[key] || 0) + item.quantity;
  });
  return Object.entries(monthlySales).map(([month, sold]) => ({ month, sold }));
};

const getOrderStatusHistory = async (orderId) => {
  const order = await Order.findById(orderId);
  return order.statusHistory || [];
};

const getDailySummary = async (dateStr) => {
  const date = new Date(dateStr);
  const next = new Date(date);
  next.setDate(date.getDate() + 1);

  const orders = await Order.find({ date: { $gte: date, $lt: next } });
  const totalSales = orders.reduce((s, o) => s + o.total, 0);
  const productsSold = orders.reduce((s, o) => s + o.items.reduce((a, i) => a + i.quantity, 0), 0);
  return {
    orders: orders.length,
    sales: totalSales,
    productsSold
  };
};

module.exports = {
  getTotalSales,
  getMostSoldProducts,
  getTopCustomers,
  getCategorySales,
  getMonthlyIncome,
  getAverageTicket,
  getPaymentMethodUsage,
  getDiscountAverage,
  getTotalTaxCollected,
  getCartSubtotal,
  getOrderProductCount,
  getAverageOrderValue,
  getCustomerLastPurchase,
  getCustomerTotalSpent,
  getCustomerLoyaltyScore,
  getProductStockStatus,
  getLowStockProducts,
  getProductSalesHistory,
  getOrderStatusHistory,
  getDailySummary
};
