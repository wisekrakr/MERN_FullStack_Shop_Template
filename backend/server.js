const app = require("./app");
const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

// setting up config file
dotenv.config({ path: "backend/config/config.env" });

// handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(
    `ERROR: ${err.message} \n Shutting down server due to Uncaught Exceptions`
  );

  server.close(() => {
    process.exit(1);
  });
});

// handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(
    `ERROR: ${err} \n Shutting down server due to Unhandled Promise Rejection`
  );

  server.close(() => {
    process.exit(1);
  });
});

// connect to database
connectDatabase();

const port = process.env.PORT || 8080;
const stage = process.env.NODE_ENV;

const server = app.listen(port, () => {
  console.log(`Server listening on PORT: ${port} in ${stage} mode`);
});
