import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS setup based on NODE_ENV
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://mern-book-store-frontend.vercel.app"
      : process.env.NODE_ENV === "development"
      ? "http://localhost:5173"
      : "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Book Store API");
});

app.use("/books", bookRoutes);
app.use("/auth", authRoutes);

// Database connection and server start
mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI
      : "mongodb://127.0.0.1:27017"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

export default app;
