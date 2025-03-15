const db = require("../config/db");

const User = {
    createUser: (name, email, passwordHash, callback) => {
        console.log("Inserting user into DB:", name, email);
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, passwordHash], (err, result) => {
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
    }
};

module.exports = User;
