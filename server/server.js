import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { places } from "./data.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

app.get("/api/places", (req, res) => {
  res.json(places);
});

app.get("/api/places/:id", (req, res) => {
  const place = places.find(
    (place) => place.id === req.params.id
  );

  if (!place) {
    return res.status(404).json({
      error: "Place not found"
    });
  }

  res.json(place);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/places/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "detail.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(
    path.join(__dirname, "../client/404.html")
  );
});