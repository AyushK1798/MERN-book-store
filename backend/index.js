  import express from "express";
  import cors from "cors";
  import { PORT, mongoDBURL } from "./config.js";
  import mongoose from "mongoose";
  import bookRoutes from "./routes/bookRoutes.js";
  import authRoutes from "./routes/authRoutes.js";

  const app = express();

  // Middleware for parsing request body
  app.use(express.json());

  // middleware for handling cros policy
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"]
    })
  );

  app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to Book Store");
  });

  app.use("/books", bookRoutes);
  app.use("/auth", authRoutes);

  mongoose
    .connect(mongoDBURL)
    .then(() => {
      console.log("APP connected with DB");
      app.listen(PORT, () => {
        console.log(`listening to port: ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
