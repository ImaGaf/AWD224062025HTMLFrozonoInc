const mongoose = require("mongoose");

const administratorSchema = new mongoose.Schema({
  idAdmin: { type: String, required: true, unique: true },
  idEmployee:    { type: String, required: true, unique: true },
  role: { type: String, required: true },
}, {
  collection: "administrator"
});

module.exports = mongoose.model("Administrator", administratorSchema);
