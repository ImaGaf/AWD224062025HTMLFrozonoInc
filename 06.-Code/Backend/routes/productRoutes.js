const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

router.get("/products-available", productController.getAvailable);
router.get("/products-discounted", productController.getCustomDiscounted);
router.post("/products/:idProduct/purchase", productController.purchase);

module.exports = router;
