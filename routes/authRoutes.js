const express = require("express");
const { signup, login ,checkSession} = require("../controllers/authController");
const {enrollCourse} = require("../controllers/courseController")

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.get("/check-session",checkSession);
router.post("/enroll",enrollCourse);

module.exports = router;
