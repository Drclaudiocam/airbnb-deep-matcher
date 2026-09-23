import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.json({
    app: "Airbnb Deep Matcher API",
    status: "online",
    endpoints: [
      "/api/health",
      "/api/taxonomy",
      "/api/profiles",
      "/api/benchmarks",
      "/api/analyze-urls",
      "/api/search-custom-keyword",
      "/api/vote"
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Airbnb Deep Matcher Backend running on http://localhost:${PORT}`);
});
