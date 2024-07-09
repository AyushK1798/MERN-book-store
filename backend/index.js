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
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? "https://mern-book-store-frontend.vercel.app"
//         : process.env.NODE_ENV === "development"
//         ? "http://localhost:5173"
//         : "http://localhost:3001", // Set to empty string or your desired default for other cases
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Book Store");
});

app.use("/books", bookRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.NODE_ENV === "production"
  ? process.env.MONGODB_URI : "mongodb://127.0.0.1:27017")
  .then(() => {
    console.log("APP connected with DB");
    app.listen(process.env.PORT, () => {
      console.log(`listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("could not connect to DB");
    console.log("MONGODB_URI", process.env.MONGODB_URI);
    console.log("LOCAL_MONGODB_URI", process.env.LOCAL_MONGODB_URI);
    console.log(error);
  });
export default app;
