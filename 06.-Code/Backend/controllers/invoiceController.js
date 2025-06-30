const Invoice = require('../models/invoice');

exports.create = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
};

exports.getById = async (req, res) => {
  const invoice = await Invoice.findOne({ idInvoice: req.params.id });
  if (!invoice) return res.status(404).json({ error: 'Not found' });
  res.json(invoice);
};

exports.update = async (req, res) => {
  const invoice = await Invoice.findOneAndUpdate(
    { idInvoice: req.params.id },
    req.body,
    { new: true }
  );
  if (!invoice) return res.status(404).json({ error: 'Not found' });
  res.json(invoice);
};

exports.delete = async (req, res) => {
  const invoice = await Invoice.findOneAndDelete({ idInvoice: req.params.id });
  if (!invoice) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
};