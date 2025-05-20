const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email.endsWith("@gandakiuniversity.edu.np")) {
    return res.status(400).json({ message: "Only Gandaki University emails are allowed!" });
  }
  if (role !== "admin" && role !== "student") {
    return res.status(400).json({ message: "Invalid role provided" });
  }

  try {
    if (role === "admin") {
      const admins = await User.findAdmin();
      if (admins.length > 0) {
        return res.status(400).json({ message: "An admin already exists!" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.createUser(name, email, hashedPassword, role);

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send token as HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

    res.json({ message: "Login successful", user: { name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error finding user" });
  }
};
