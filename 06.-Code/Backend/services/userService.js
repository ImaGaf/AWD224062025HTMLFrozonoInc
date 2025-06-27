const User = require("../models/user");

exports.getAllUsers = async () => User.find();

exports.getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
};

exports.createUser = async (data) => {
  const newUser = new User(data);
  return await newUser.save();
};

exports.updateUser = async (id, data) => {
  const updated = await User.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Usuario no encontrado");
  return updated;
};

exports.deleteUser = async (id) => {
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) throw new Error("Usuario no encontrado");
  return deleted;
};
