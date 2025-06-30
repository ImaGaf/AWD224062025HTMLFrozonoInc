const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/totalSales', statsController.getTotalSales);
router.get('/mostSoldProducts', statsController.getMostSoldProducts);
router.get('/topCustomers', statsController.getTopCustomers);
router.get('/categorySales', statsController.getCategorySales);
router.get('/monthlyIncome', statsController.getMonthlyIncome);
router.get('/averageTicket', statsController.getAverageTicket);
router.get('/methods/usage', statsController.getPaymentMethodUsage);
router.get('/discountAverage', statsController.getDiscountAverage);
router.get('/taxCollected', statsController.getTotalTaxCollected);
router.get('/cart/:cartId/subtotal', statsController.getCartSubtotal);
router.get('/order/:orderId/productCount', statsController.getOrderProductCount);
router.get('/order/averageValue', statsController.getAverageOrderValue);
router.get('/customer/:id/lastPurchase', statsController.getCustomerLastPurchase);
router.get('/customer/:id/totalSpent', statsController.getCustomerTotalSpent);
router.get('/customer/:id/loyaltyScore', statsController.getCustomerLoyaltyScore);
router.get('/product/:id/stockStatus', statsController.getProductStockStatus);
router.get('/product/lowStock', statsController.getLowStockProducts);
router.get('/product/:id/salesHistory', statsController.getProductSalesHistory);
router.get('/order/:id/statusHistory', statsController.getOrderStatusHistory);
router.get('/reports/dailySummary', statsController.getDailySummary); 

module.exports = router;
