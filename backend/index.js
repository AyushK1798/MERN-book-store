import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// middleware for handling cros policy
app.use(
  cors({
    origin: "https://mern-book-store-frontend-5m4zqfkph-ayushk1798.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Book Store");
});

app.use("/books", bookRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("APP connected with DB");
    app.listen(process.env.PORT, () => {
      console.log(`listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
  export default app;

