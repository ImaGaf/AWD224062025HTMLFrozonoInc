const statsService = require('../services/statsService');

module.exports = {
  getTotalSales: async (req, res) => {
    try { res.json(await statsService.getTotalSales()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getMostSoldProducts: async (req, res) => {
    try { res.json(await statsService.getMostSoldProducts()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getTopCustomers: async (req, res) => {
    try { res.json(await statsService.getTopCustomers()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getCategorySales: async (req, res) => {
    try { res.json(await statsService.getCategorySales()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getMonthlyIncome: async (req, res) => {
    try { res.json(await statsService.getMonthlyIncome()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getAverageTicket: async (req, res) => {
    try { res.json(await statsService.getAverageTicket()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getPaymentMethodUsage: async (req, res) => {
    try { res.json(await statsService.getPaymentMethodUsage()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getDiscountAverage: async (req, res) => {
    try { res.json(await statsService.getDiscountAverage()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getTotalTaxCollected: async (req, res) => {
    try { res.json(await statsService.getTotalTaxCollected()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getCartSubtotal: async (req, res) => {
    try { res.json(await statsService.getCartSubtotal(req.params.cartId)); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getOrderProductCount: async (req, res) => {
    try { res.json(await statsService.getOrderProductCount(req.params.orderId)); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getAverageOrderValue: async (req, res) => {
    try { res.json(await statsService.getAverageOrderValue()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getCustomerLastPurchase: async (req, res) => {
    try { res.json(await statsService.getCustomerLastPurchase(req.params.id)); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getCustomerTotalSpent: async (req, res) => {
    try { res.json(await statsService.getCustomerTotalSpent(req.params.id)); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getCustomerLoyaltyScore: async (req, res) => {
    try { res.json(await statsService.getCustomerLoyaltyScore(req.params.id)); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getProductStockStatus: async (req, res) => {
    try { res.json(await statsService.getProductStockStatus(req.params.id)); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getLowStockProducts: async (req, res) => {
    try { res.json(await statsService.getLowStockProducts()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getProductSalesHistory: async (req, res) => {
    try { res.json(await statsService.getProductSalesHistory(req.params.id)); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getOrderStatusHistory: async (req, res) => {
    try { res.json(await statsService.getOrderStatusHistory(req.params.id)); }
    catch (e) { res.status(500).json({ error: e.message }); }
  },
  getDailySummary: async (req, res) => {
    try { res.json(await statsService.getDailySummary(req.query.date)); }
    catch (e) { res.status(500).json({ error: e.message }); }
  }
};
