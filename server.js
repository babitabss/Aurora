const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
  });

const PORT = process.env.PORT || 5005;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});

process.on('SIGINT', () => {
    console.log("Gracefully shutting down the server...");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
  