const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();

// Conect MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const mainRoutes = require("./routes/mainRoutes");
app.use("/", mainRoutes);

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`GlucoInsight is running at http://localhost:${PORT}`);
});
