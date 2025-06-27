const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  idEmployee:  { type: String, required: true },
  idUser:     { type: String, required: true, unique: true },
  role:     { type: String },
  idAdmin:  { type: String },         
}, {
  timestamps: true,
  collection: "employee"
});

module.exports = mongoose.model("Employee", employeeSchema);
