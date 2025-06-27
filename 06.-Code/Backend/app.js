require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/api/administrators", require("./routes/administratorRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("API RESTful de Barroco funcionando correctamente");
});

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
