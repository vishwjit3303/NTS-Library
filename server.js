const express = require("express");
const mongoose = require("./config/db");
const profileRoutes = require("./Profile/routes/profile");
const searchFilterRoutes = require("./SearchFilter/searchFilterRoutes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api/profile", profileRoutes);
app.use("/api/books", searchFilterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(
  jwt.sign({ id: "507f1f77bcf86cd799439011" }, process.env.ACCESS_TOKEN_SECRET)
);
