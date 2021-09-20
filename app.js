const express = require("express");
const path = require('path')
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const userRoute = require("./Routes/userRoute");

// ???
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// setup req => json
app.use(express.json());
// setup cors
app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,*");
  next();
});
//setup static file
const publichPathDirectory = path.join(__dirname, "./public");
app.use("/public" , express.static(publichPathDirectory))
// ???
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// setup api
app.use("/api/v1/users", userRoute);

module.exports = app;
