const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pathshala',
    port:process.env.PORT,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

db.getConnection((err,connection) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Connected to MySQL Database");
        connection.release();
    }
});

module.exports = db;
