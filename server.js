const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

// Enable CORS with credentials support
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Allow only your frontend URL
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true // Allow sending cookies and authorization headers
}));

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

const PORT = 5011;
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
