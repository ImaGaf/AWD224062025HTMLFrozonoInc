const Invoice = require('../models/invoice');
const Product = require('../models/product');
const CartItem = require('../models/cartItem');
const Customer = require('../models/customer');
const Order = require('../models/order');
const Payment = require('../models/payment');
const ShoppingCart = require('../models/shoppingCart')

const getTotalSales = async () => {
  const invoices = await Invoice.find();
  const totalSales = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  return { totalSales };
};

const getMostSoldProducts = async () => {
  const items = await CartItem.find().populate('product');
  const counts = {};

  items.forEach(item => {
    if (!item.product || !item.product._id) return;

    const id = item.product._id.toString();
    if (!counts[id]) counts[id] = { name: item.product.name, quantity: 0 };
    counts[id].quantity += item.quantity;
  });

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .map(([productId, data]) => ({
      productId,
      name: data.name,
      quantity: data.quantity
    }));

  return { topProducts: sorted.slice(0, 5) };
};


const getTopCustomers = async () => {
  const orders = await Order.find().populate('customer'); 

  const map = {};
  orders.forEach(order => {
    if (order.customer && order.customer.idCustomer != null) {
      const id = order.customer.idCustomer;

      if (!map[id]) {
        map[id] = {
          idCustomer: id,
          firstName: order.customer.firstName,
          lastName: order.customer.lastName,
          totalSpent: 0
        };
      }

      map[id].totalSpent += order.total;
    }
  });

  const sorted = Object.values(map)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5); // Top 5

  return { topCustomers: sorted };
};



const getCategorySales = async () => {
  const items = await CartItem.find()
    .populate({ path: 'product', populate: { path: 'category' } });

  const map = {};
  items.forEach(item => {
    const product = item.product;
    if (product && product.category && product.category.name) {
      const category = product.category.name;
      console.log(category)
      map[category] = (map[category] || 0) + item.subtotal;
    }
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
    const method = p.paymentMethod;
    usage[method] = (usage[method] || 0) + 1;
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
  const cart = await ShoppingCart.findById(cartId);
  if (!cart || !cart.product) return { subtotal: 0 };

  const subtotal = cart.product.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  return { subtotal };
};

const getOrderProductCount = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order || !order.products) return { count: 0 };

  const productStr = String(order.products);
  const count = productStr.split(',').length;

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
  const items = await CartItem.find({ product: productId });

  const monthlySales = {};
  items.forEach(item => {
    if (!item.createdAt) return; 

    const date = new Date(item.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    monthlySales[key] = (monthlySales[key] || 0) + item.quantity;
  });

  return Object.entries(monthlySales)
    .map(([month, sold]) => ({ month, sold }))
    .sort((a, b) => a.month.localeCompare(b.month));
};


const getOrderStatusHistory = async (orderId) => {
  const order = await Order.findById(orderId);
  return order.status || [];
};

const getDailySummary = async (dateStr = new Date().toISOString().slice(0, 10)) => {
  console.log("📅 dateStr recibido:", dateStr);

  if (!dateStr || typeof dateStr !== 'string') {
    throw new Error('Fecha faltante o inválida');
  }

  const normalizeDateInput = (str) => {
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
      const [d, m, y] = str.split('/');
      return `${y}-${m}-${d}`;
    }
    return str;
  };

  const date = new Date(normalizeDateInput(dateStr));
  if (isNaN(date.getTime())) {
    throw new Error('Fecha inválida. Usa formato YYYY-MM-DD o DD/MM/YYYY.');
  }

  const next = new Date(date);
  next.setDate(date.getDate() + 1);

  const orders = await Order.find({ date: { $gte: date, $lt: next } });

  const totalSales = orders.reduce((s, o) => s + o.total, 0);

  const productsSold = orders.reduce((s, o) => {
    const numProducts = o.products
      ? String(o.products).split(',').filter(p => p.trim() !== '').length
      : 0;
    return s + numProducts;
  }, 0);

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
