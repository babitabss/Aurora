const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db =require('../config/db');


const storage = multer.diskStorage({
    destination :  (req,file,cb) => cb(null,"uploads/"),
    filename :(req,file,cb) =>{
        const uniqueName = Date.now() + "-" +file.originalname;
        cb(null,uniqueName);
    }
  
}) 

const upload = multer({storage});

router.post("/upload-chapter",upload.single("chapterFile"),(req,res)=>{
    const {title ,subject ,uploaded_by} = req.body;
    const filename = req.file.filename;

    const sql = "INSERT INTO chapters (title,subject,filename,uploaded_by) VALUES (?,?,?,?)";
    db.query(sql,[title,subject,filename,uploaded_by],(err) =>{
        if (err){
            console.error("Uploaded error:",err);
            return res.status(500).json({error:"Upload failed"});
        }
        res.json({message: "Chapter uploaded successfully"});
    });
});

router.get("/chapters/:subject" ,(req,res)=>{
    const {subject} = req.params;
    db.query("SELECT * FROM chapters WHERE subject = ?" ,[subject],(err,results)=>{
        if(err) return res.status(500).json({error:"Fetch error"});
        res.json(results);
    })
})


router.use("/files",express.static(path.join(__dirname,"..","uploads")));
const User = require("../models/User"); // Import User model

// Get all students
router.get("/users", (req, res) => {
    User.findAllStudents((err, results) => {
        if (err) {
            console.error("DB Fetch Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        console.log("Fetched users: ", results);
        res.json(results);
    });
});

// Delete a user (student)
router.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    
    User.deleteUserById(userId, (err, result) => {
        if (err) return res.status(500).json({ error: "Delete failed" });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Student not found or cannot delete admin" });
        }
        res.json({ message: "User deleted successfully" });
    });
});

// DELETE chapter by ID
router.delete("/chapters/:id", (req, res) => {
    const chapterId = req.params.id;

    db.query("DELETE FROM chapters WHERE id = ?", [chapterId], (err, result) => {
        if (err) return res.status(500).json({ error: "Delete failed" });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        res.json({ message: "Chapter deleted successfully" });
    });
});


module.exports = router;
