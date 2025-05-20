const express = require('express');
const router = express.Router();
const db = require('../config/db'); // your DB connection

// POST /api/contact
router.post('/send', async (req, res) => {
  const { name, email, message } = req.body;
  
if (!name ||!email || !message){
  return res.status(400).json({success:false,message:"please fill in all fields"})
}

  try {
    await db.query('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    res.json({ success: true, message: 'Message received!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to save message.' });
  }       
});

// GET /api/admin/messages
router.get('/admin/messages', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM messages ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages.' });
  }
});

module.exports = router;
