const Administrator = require("../models/administrator");

exports.getAllAdministrators = async () => Administrator.find();

exports.getAdministratorById = async (id) => {
  const admin = await Administrator.findById(id);
  if (!admin) throw new Error("Administrador no encontrado");
  return admin;
};

exports.createAdministrator = async (data) => {
  const newAdmin = new Administrator(data);
  return await newAdmin.save();
};

exports.updateAdministrator = async (id, data) => {
  const updated = await Administrator.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Administrador no encontrado");
  return updated;
};

exports.deleteAdministrator = async (id) => {
  const deleted = await Administrator.findByIdAndDelete(id);
  if (!deleted) throw new Error("Administrador no encontrado");
  return deleted;
};
