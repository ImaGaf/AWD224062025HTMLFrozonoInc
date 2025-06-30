const Order = require("../models/order");

exports.getAll = () => Order.find();

exports.getOrderById = async (id) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Orden no encontrada");
  return order;
};

exports.createOrder = (data) => {
  const newOrder = new Order(data);
  return newOrder.save();
};

exports.updateOrder = async (id, data) => {
  const updated = await Order.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Orden no encontrada");
  return updated;
};

exports.deleteOrder = async (id) => {
  const deleted = await Order.findByIdAndDelete(id);
  if (!deleted) throw new Error("Orden no encontrada");
  return deleted;
};
