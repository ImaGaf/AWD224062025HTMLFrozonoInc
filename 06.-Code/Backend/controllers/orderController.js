const orderService = require("../services/orderService");

exports.getAll = async (req, res) => {
  try {
    const orders = await orderService.getAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las órdenes", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(404).json({ message: "Orden no encontrada", error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la orden", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (error) {
    res.status(404).json({ message: "Error al actualizar la orden", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedOrder = await orderService.deleteOrder(req.params.id);
    res.json({ message: "Orden eliminada correctamente", order: deletedOrder });
  } catch (error) {
    res.status(404).json({ message: "Error al eliminar la orden", error: error.message });
  }
};
