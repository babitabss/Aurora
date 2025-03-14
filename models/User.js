const db = require("../config/db");

const User = {
    createUser: (name, email, passwordHash, callback) => {
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, passwordHash], callback);
    },

    findUserByEmail: (email, callback) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], callback);
    }
};

module.exports = User;
