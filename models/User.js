const db = require("../config/db");

const User = {
    createUser: (name, email, passwordHash, role, callback) => {
        console.log("Inserting user into DB:", name, email, role);
        const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, passwordHash, role], (err, result) => {
            if (err) {
                console.error("DB Insert Error:", err);
                callback(err, null);
            } else {
                console.log("User successfully inserted:", result);
                callback(null, result);
            }
        });
    },

    findUserByEmail: (email, callback) => {
        console.log("Searching for user:", email);
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], (err, results) => {
            if (err) {
                console.error("DB Fetch Error:", err);
            }
            callback(err, results);
        });
    },

    findAdmin: (callback) => {
        const sql = "SELECT * FROM users WHERE role = 'admin'";
        db.query(sql, (err, results) => {
            if (err) {
                console.error("DB Fetch Error:", err);
            }
            callback(err, results);
        });
    },

    // New method to fetch all students
    findAllStudents: (callback) => {
        const sql = "SELECT id, name, email FROM users WHERE role = 'student'";
        db.query(sql, (err, results) => {
            if (err) {
                console.error("DB Fetch Error:", err);
                callback(err, null);
            }
            callback(null, results);
        });
    },

    // New method to delete a user by ID
    deleteUserById: (userId, callback) => {
        const sql = "DELETE FROM users WHERE id = ? AND role = 'student'";
        db.query(sql, [userId], (err, result) => {
            if (err) {
                console.error("DB Delete Error:", err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
};

module.exports = User;
