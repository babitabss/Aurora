const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");

require("dotenv").config();

const app = express();

// Enable CORS with credentials support
app.use(cors({
  origin:  ['http://127.0.0.1:5500', 'http://127.0.0.1:5501'],
  methods: ['GET', 'POST', 'DELETE'],            // split as separate strings
  allowedHeaders: ['Content-Type', 'Authorization'],  // split as separate strings
  credentials: true
}));


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/courses", courseRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

const PORT = 5013;
const server = app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});

// Gracefully shutdown server
process.on('SIGINT', () => {
  console.log("Gracefully shutting down the server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
