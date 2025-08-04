const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Counter = require("./counter");

const employeeSchema = new mongoose.Schema({
  idEmployee: { type: Number, unique: true, index: true },
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  role:      { type: String, default: "employee" },
  idAdmin:   { type: Number }, // o mongoose.Schema.Types.ObjectId si quieres
}, {
  collection: "employee",
  timestamps: true,
});

employeeSchema.pre("save", async function(next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "employeeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.idEmployee = counter.seq;
  }
  next();
});

employeeSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

employeeSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Employee", employeeSchema);
