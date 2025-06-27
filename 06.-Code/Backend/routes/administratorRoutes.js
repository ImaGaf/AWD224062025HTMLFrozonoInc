const express = require("express");
const router = express.Router();
const administratorController = require("../controllers/administratorController");

router.get("/", administratorController.getAll);
router.get("/:id", administratorController.getById);
router.post("/", administratorController.create);
router.put("/:id", administratorController.update);
router.delete("/:id", administratorController.remove);

module.exports = router;
