const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');
const User = require("../models/User");

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

/**
 * Upload a chapter
 */
router.post("/upload-chapter", upload.single("chapterFile"), async (req, res) => {
    const { title, subject, uploaded_by } = req.body;
    const filename = req.file.filename;

    const sql = "INSERT INTO chapters (title, subject, filename, uploaded_by) VALUES (?, ?, ?, ?)";
    try {
        await db.query(sql, [title, subject, filename, uploaded_by]);
        res.json({ message: "Chapter uploaded successfully" });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: "Upload failed" });
    }
});

/**
 * Get all chapters for a subject
 */
router.get("/chapters/:subject", async (req, res) => {
    const { subject } = req.params;
    try {
        const [results] = await db.query("SELECT * FROM chapters WHERE subject = ?", [subject]);
        res.json(results);
    } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({ error: "Fetch error" });
    }
});

/**
 * Serve uploaded files statically
 */
router.use("/files", express.static(path.join(__dirname, "..", "uploads")));

/**
 * Get all students
 */
router.get("/users", async (req, res) => {
    try {
        const students = await User.findAllStudents();
        console.log("Fetched users:", students);
        res.json(students);
    } catch (err) {
        console.error("DB Fetch Error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

/**
 * Delete a student user
 */
router.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await User.deleteUserById(userId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Student not found or cannot delete admin" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ error: "Delete failed" });
    }
});

/**
 * Delete chapter by ID for subject AI
 */
router.delete("/chapters/AI/:id", async (req, res) => {
    const chapterId = req.params.id;
    try {
      const [result] = await db.query("DELETE FROM chapters WHERE id = ?", [chapterId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Chapter not found" });
      }
      res.json({ message: "Chapter deleted successfully" });
    } catch (err) {
      console.error("Delete chapter error:", err);
      res.status(500).json({ error: "Delete failed" });
    }
  });
  

module.exports = router;
