const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const errorMiddleWare = require("./middleware/errors");

app.use(express.json());
app.use(cookieParser());

// import all routes & use all routes
app.use("/api/v1", require("./routes/auth"));
app.use("/api/v1", require("./routes/user"));
app.use("/api/v1", require("./routes/product"));
app.use("/api/v1", require("./routes/order"));
app.use("/api/v1", require("./routes/review"));
app.use("/api/v1", require("./routes/category"));

//error handling
app.use(errorMiddleWare);

module.exports = app;
