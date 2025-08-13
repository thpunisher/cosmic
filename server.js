// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // enable CORS

app.get("/", (req, res) => {
  res.send("Server is running. Visit /api/astros for JSON.");
});

app.get("/api/astros", async (req, res) => {
  try {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch astronauts" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
