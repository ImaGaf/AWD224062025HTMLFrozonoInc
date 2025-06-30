const Invoice = require('../models/invoice');

exports.createInvoice = async (data) => {
  const invoice = new Invoice(data);
  return await invoice.save();
};

exports.getAllInvoices = async () => {
  return await Invoice.find();
};

exports.getInvoiceById = async (id) => {
  return await Invoice.findOne({ idInvoice: id });
};

exports.updateInvoice = async (id, data) => {
  return await Invoice.findOneAndUpdate({ idInvoice: id }, data, { new: true });
};

exports.deleteInvoice = async (id) => {
  return await Invoice.findOneAndDelete({ idInvoice: id });
};
