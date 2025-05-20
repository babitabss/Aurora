const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to get AI chapters
router.get("/AI/chapters", async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM chapters WHERE subject = 'AI'");
        res.json(results);
    } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({ error: "Fetch error" });
    }
});

module.exports = router;
