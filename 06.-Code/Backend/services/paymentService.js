const Payment = require("../models/payment");

exports.getAllPayments = async () => Payment.find();

exports.getPaymentById = async (id) => {
  const payment = await Payment.findById(id);
  if (!payment) throw new Error("Payment not found");
  return payment;
};

exports.createPayment = async (data) => {
  const newPayment = new Payment(data);
  return await newPayment.save();
};

exports.updatePayment = async (id, data) => {
  const updated = await Payment.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Payment not found");
  return updated;
};

exports.deletePayment = async (id) => {
  const deleted = await Payment.findByIdAndDelete(id);
  if (!deleted) throw new Error("Payment not found");
  return deleted;
};
