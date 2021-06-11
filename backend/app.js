const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const errorMiddleWare = require("./middleware/errors");

app.use(express.json());
app.use(cookieParser());

//import all routes
const auth = require("./routes/auth");
const profiles = require("./routes/user");
const products = require("./routes/product");
const orders = require("./routes/order");
const reviews = require("./routes/review");

//use all routes
app.use("/api/v1", auth);
app.use("/api/v1", profiles);
app.use("/api/v1", products);
app.use("/api/v1", orders);
app.use("/api/v1", reviews);

//error handling
app.use(errorMiddleWare);

module.exports = app;
