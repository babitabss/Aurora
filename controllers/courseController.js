const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Your MySQL db connection
require("dotenv").config();

exports.enrollCourse = (req, res) => {
  const token = req.cookies.token;
  const { courseId } = req.body;

  if (!token) return res.status(401).json({ success: false, message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const query = "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)";
    db.query(query, [userId, courseId], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ success: false, message: "Already enrolled in this course" });
        }
        console.error("Enrollment error:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      res.json({ success: true, message: "Enrolled successfully!" });
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
