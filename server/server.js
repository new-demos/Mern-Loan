const express = require("express");
const cors = require("cors");
const User = require("./models/register.js");
const connectDB = require("./db/connection.js");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Register Route
app.post("/api/register", async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ success: true, data: { user: { name: user.name, email: user.email, role: user.role }, token } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ success: true, data: { user: { name: user.name, email: user.email, role: user.role }, token } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get All Users Route
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, 'name email role'); // Only return necessary fields
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("Hello, this is the backend");
});

// Start Server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
