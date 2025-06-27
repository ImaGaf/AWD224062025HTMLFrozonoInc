const employeeService = require("../services/employeeService");

exports.getAll = async (req, res) => {
  try {
    const list = await employeeService.getAllEmployees();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const emp = await employeeService.getEmployeeById(req.params.id);
    res.json(emp);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const created = await employeeService.createEmployee(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await employeeService.updateEmployee(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await employeeService.deleteEmployee(req.params.id);
    res.json({ message: "Empleado eliminado", employee: deleted });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
