const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const carsRoute = require("./routes/cars");
const usersRoute = require("./routes/users");

const app = express();
app.set("x-powered-by", false);
dotenv.config();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.set("trust proxy", 1);

// Allow CORS from any origin
app.use(cors());

// Instead of body parser
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_CONNECT);
const connection = mongoose.connection;
connection.on("open", () => {
  console.log("Connected to the database");
});

app.use("/users", usersRoute);
app.use("/cars", carsRoute);

module.exports = app;
