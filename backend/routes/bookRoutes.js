import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Middleware for validating required fields
const validateBookData = (req, res, next) => {
  const { title, author, publishYear } = req.body;
  if (!title || !author || !publishYear) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields: title, author, publishYear",
    });
  }
  next();
};

// Route to Add/post data
router.post("/", validateBookData, async (req, res) => {
  try {
    const newBook = { ...req.body };
    const book = await Book.create(newBook);
    return res.status(201).json({
      success: true,
      data: book,
      message: "Book added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// Route to get all data/entries
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// Route to get data entry by Id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// Route to update data by id
router.put("/:id", validateBookData, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: book,
      message: "Book updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// Route to delete data by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

export default router;
