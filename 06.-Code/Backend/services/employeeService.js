const Employee = require("../models/employee");

exports.getAllEmployees = async () => Employee.find();

exports.getEmployeeById = async (id) => {
  const emp = await Employee.findById(id);
  if (!emp) throw new Error("Empleado no encontrado");
  return emp;
};

exports.createEmployee = async (data) => {
  const newEmp = new Employee(data);
  return await newEmp.save();
};

exports.updateEmployee = async (id, data) => {
  const updated = await Employee.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Empleado no encontrado");
  return updated;
};

exports.deleteEmployee = async (id) => {
  const deleted = await Employee.findByIdAndDelete(id);
  if (!deleted) throw new Error("Empleado no encontrado");
  return deleted;
};
