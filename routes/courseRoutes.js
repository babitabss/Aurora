const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to get AI chapters
router.get("/AI/chapters", (req, res) => {
    const sql = "SELECT * FROM chapters WHERE subject = 'AI'";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Fetch error" });
        res.json(results);
    });
});

router.delete("/AI/chapters/:id", (req,res) => {
    const chapterId = req.params.id;
    // Optionally delete file from disk too
    const selectSql = "SELECT filename FROM chapters WHERE id = ?";
    db.query(selectSql, [chapterId], (err, results) => {
        if(err) return res.status(500).json({ error: "Delete failed" });
        if(results.length === 0) return res.status(404).json({ error: "Chapter not found" });

        const filepath = path.join(__dirname, "..", "uploads", results[0].filename);
        fs.unlink(filepath, (fsErr) => {
            if(fsErr) console.warn("File delete warning:", fsErr);
            const deleteSql = "DELETE FROM chapters WHERE id = ?";
            db.query(deleteSql, [chapterId], (err2, result) => {
                if(err2) return res.status(500).json({ error: "Delete failed" });
                res.json({ message: "Chapter deleted successfully" });
            });
        });
    });
});


module.exports = router;
