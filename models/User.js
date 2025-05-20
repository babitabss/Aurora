const db = require("../config/db");

const User = {
    createUser: async (name, email, passwordHash, role) => {
        console.log("Inserting user into DB:", name, email, role);
        const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        const [result] = await db.query(sql, [name, email, passwordHash, role]);
        return result;
    },

    findUserByEmail: async (email) => {
        console.log("Searching for user:", email);
        const sql = "SELECT * FROM users WHERE email = ?";
        const [results] = await db.query(sql, [email]);
        return results[0]; // if you expect only one user
    },

    findAdmin: async () => {
        const sql = "SELECT * FROM users WHERE role = 'admin'";
        const [results] = await db.query(sql);
        return results;
    },

    findAllStudents: async () => {
        const sql = "SELECT id, name, email FROM users WHERE role = 'student'";
        const [results] = await db.query(sql);
        return results;
    },

    deleteUserById: async (userId) => {
        const sql = "DELETE FROM users WHERE id = ? AND role = 'student'";
        const [result] = await db.query(sql, [userId]);
        return result;
    }
};

module.exports = User;
