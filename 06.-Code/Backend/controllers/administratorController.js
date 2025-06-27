const adminService = require("../services/administratorService");

exports.getAll = async (req, res) => {
  try {
    const list = await adminService.getAllAdministrators();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const admin = await adminService.getAdministratorById(req.params.id);
    res.json(admin);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const created = await adminService.createAdministrator(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await adminService.updateAdministrator(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await adminService.deleteAdministrator(req.params.id);
    res.json({ message: "Administrador eliminado", administrator: deleted });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
