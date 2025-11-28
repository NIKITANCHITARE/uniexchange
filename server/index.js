const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const materialRoutes = require("./routes/materialRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/material", materialRoutes);   // <--- FIXED (singular)

app.listen(8080, () => console.log("Server running on port 8080"));
