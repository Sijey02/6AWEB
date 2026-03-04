const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONNECTION_STRING = "mongodb://localhost:27017";

const DATABASENAME = "MyDb";
let database;

// Middleware instantiation
app.use((req, res, next) => {
  if (!database) {
    return res.status(503).json({ error: "Database not connected yet." });
  }
  next();
});

console.log("Starting API...");
console.log("Connecting to MongoDB...");

async function start() {
  try {
    // Create client with timeouts so you see errors quickly
    const client = new MongoClient(CONNECTION_STRING, {
      serverSelectionTimeoutMS: 10000, // 10s
      connectTimeoutMS: 10000,
    });

    await client.connect();

    database = client.db(DATABASENAME);
    console.log("Yay! Now connected to Cluster");

    app.listen(5038, () => {
      console.log("Server running on http://localhost:5038");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

start();

// ROUTES TO ALL METHODS

// Get all books
app.get("/api/books/GetBooks", async (req, res) => {
  try {
    const result = await database.collection("Books").find({}).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Add a book
app.post("/api/books/AddBook", multer().none(), async (req, res) => {
  try {
    console.log("AddBook request body:", req.body);
    
    const numOfDocs = await database.collection("Books").countDocuments();

    const newBook = {
      id: String(numOfDocs + 1),
      title: req.body.title,
      desc: req.body.description,         
      price: Number(req.body.price) || 0,
    };
    
    console.log("Inserting book:", newBook);

    await database.collection("Books").insertOne(newBook);

    res.json("Added Successfully");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

// Delete book
app.delete("/api/books/DeleteBook", async (req, res) => {
  try {
    await database.collection("Books").deleteOne({ id: req.query.id });
    res.json("Deleted successfully!");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// Update book
app.put("/api/books/UpdateBook", multer().none(), async (req, res) => {
  try {
    await database.collection("Books").updateOne(
      { id: req.body.id },
      {
        $set: {
          title: req.body.title,
          desc: req.body.description,
          price: Number(req.body.price) || 0,
        },
      }
    );
    res.json("Updated successfully!");
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Search books
app.get("/api/books/SearchBooks", async (req, res) => {
  try {
    const query = req.query.query;
    const searchRegex = new RegExp(query, "i");
    const result = await database
      .collection("Books")
      .find({
        $or: [
          { title: searchRegex },
          { desc: searchRegex },
        ],
      })
      .toArray();
    res.send(result);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Failed to search books" });
  }
});

