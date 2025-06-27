const Product = require("../models/product");

exports.getAllProducts = async () => {
  return await Product.find({});
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Producto no encontrado");
  return product;
};

exports.createProduct = async (data) => {
  const newProduct = new Product(data);
  return await newProduct.save();
};

exports.updateProduct = async (id, data) => {
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Producto no encontrado");
  return updated;
};

exports.deleteProduct = async (id) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new Error("Producto no encontrado");
  return deleted;
};
