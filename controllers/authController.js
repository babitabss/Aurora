const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.signup = (req, res) => {
    const { name, email, password ,role} = req.body;

    if (!email.endsWith("@gandakiuniversity.edu.np")) {
        return res.status(400).json({ message: "Only Gandaki University emails are allowed!" });
    }
    if (role !== 'admin' && role !== 'student'){
        return res.status(400).json({message:"Invalid role provided"})
    }
if (role === "admin"){
User.findAdmin((err,adminResult)=>{
    if (err)
        return res.status(500).json({message:"Error checking admin existence"});
    if (adminResult.length > 0){
        return res.status(400).json({message: "An admin already exists!"});
    }
    hashAndCreateUser();
});
}
else{
    hashAndCreateUser();
}
function hashAndCreateUser(){
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        User.createUser(name, email, hashedPassword, role,(err, result) => {
            if (err) return res.status(500).json({ message: "Error registering user" });

            res.status(201).json({ message: "User registered successfully" });
        });
    });
}
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findUserByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ message: "Error finding user" });
        if (results.length === 0) return res.status(400).json({ message: "User not found" });

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

            // Send token as HTTP-only cookie
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

            res.json({ message: "Login successful", user: { name: user.name, email: user.email ,role:user.role} });
        });
    });
};
