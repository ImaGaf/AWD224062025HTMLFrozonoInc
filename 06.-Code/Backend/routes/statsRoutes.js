const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/total-sales', statsController.getTotalSales);
router.get('/most-sold-products', statsController.getMostSoldProducts);
router.get('/top-customers', statsController.getTopCustomers);
router.get('/category-sales', statsController.getCategorySales);
router.get('/monthly-income', statsController.getMonthlyIncome);
router.get('/average-ticket', statsController.getAverageTicket);
router.get('/methods/usage', statsController.getPaymentMethodUsage);
router.get('/discount-average', statsController.getDiscountAverage);
router.get('/tax-collected', statsController.getTotalTaxCollected);
router.get('/cart/:cartId/subtotal', statsController.getCartSubtotal);
router.get('/order/:orderId/product-count', statsController.getOrderProductCount);
router.get('/order/average-value', statsController.getAverageOrderValue);
router.get('/customer/:id/last-purchase', statsController.getCustomerLastPurchase);
router.get('/customer/:id/total-spent', statsController.getCustomerTotalSpent);
router.get('/customer/:id/loyalty-score', statsController.getCustomerLoyaltyScore);
router.get('/product/:id/stock-status', statsController.getProductStockStatus);
router.get('/product/low-stock', statsController.getLowStockProducts);
router.get('/product/:id/sales-history', statsController.getProductSalesHistory);
router.get('/order/:id/status-history', statsController.getOrderStatusHistory);
router.get('/reports/daily-summary', statsController.getDailySummary); 

module.exports = router;
