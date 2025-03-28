const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Change as needed
    database: "pathshala"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("MySQL Connected");
});

// Routes
app.get("/courses", (req, res) => {
    db.query("SELECT * FROM courses", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post("/courses", (req, res) => {
    const { name, description } = req.body;
    db.query("INSERT INTO courses (name, description) VALUES (?, ?)", [name, description], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Course added" });
    });
});

app.delete("/courses/:id", (req, res) => {
    db.query("DELETE FROM courses WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Course deleted" });
    });
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.delete("/users/:id", (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User removed" });
    });
});

app.get("/messages", (req, res) => {
    db.query("SELECT * FROM messages", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




