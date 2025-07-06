require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/barroco/administrators", require("./routes/administratorRoutes"));
app.use("/barroco/employees", require("./routes/employeeRoutes"));
app.use("/barroco/products", require("./routes/productRoutes"));
app.use("/barroco/users", require("./routes/userRoutes"));
app.use("/barroco/payments", require("./routes/paymentRoutes"));
app.use("/barroco/categories", require("./routes/categoryRoutes"));
app.use("/barroco/customers", require("./routes/customerRoutes"));
app.use("/barroco/orders", require("./routes/orderRoutes"));
app.use("/barroco/cart-items", require("./routes/cartItemRoutes"));
app.use("/barroco/stats", require('./routes/statsRoutes'));
app.use("/barroco/invoices", require('./routes/invoiceRoutes'));
app.use("/barroco/shoppingCart", require('./routes/shoppingCartRoutes'));


app.get("/", (req, res) => {
  res.send("API RESTful de Barroco funcionando correctamente");
});

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
