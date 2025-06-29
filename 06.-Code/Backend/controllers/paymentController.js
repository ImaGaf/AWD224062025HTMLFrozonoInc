const paymentService = require("../services/paymentService");

exports.getAll = async (req, res) => {
  try {
    const list = await paymentService.getAllPayments();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    res.json(payment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const created = await paymentService.createPayment(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await paymentService.updatePayment(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await paymentService.deletePayment(req.params.id);
    res.json({ message: "Payment deleted", payment: deleted });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

