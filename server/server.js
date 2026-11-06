import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes, { seedInitialAdmin } from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*", // Allow Vite preview and local development
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Connect to MongoDB
connectDB().then(() => {
  seedInitialAdmin();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/images", uploadRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Chalcedony MongoDB API",
    time: new Date().toISOString(),
  });
});

// Root welcome
app.get("/", (req, res) => {
  res.send("Chalcedony Adventures MongoDB Backend API is running.");
});

// Start listening
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`Chalcedony MongoDB API Server running on port ${PORT}`);
  console.log(`Image endpoint: http://localhost:${PORT}/api/images/:id`);
  console.log(`Auth endpoint:  http://localhost:${PORT}/api/auth/login`);
  console.log(`===============================================`);
});
