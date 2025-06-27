const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  idUser: { type: String, required: true, unique: true },
  firstName:    { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  email:     { type: String, required: true},
  password:     { type: String, required: true},
  idCostumer:     { type: String, required: true},
  idEmployee:     { type: String, required: true},
}, {
  timestamps: true,
  collection: "user"
});

module.exports = mongoose.model("User", userSchema);
