// controllers/bookController.js
import Book from "../models/Book.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";

export const searchBooks = async (req, res) => {
  try {
    const { q, author, minRating } = req.query;

    // 1. Base query
    let query = {};

    // Search by title (case-insensitive)
    if (q) {
      query.title = { $regex: q, $options: "i" };
    }

    // Filter by author
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

    // 2. Find books
    let books = await Book.find(query);

    // 3. If filtering by rating, run aggregation
    if (minRating) {
      const stats = await Review.aggregate([
        {
          $group: {
            _id: "$book",
            avgRating: { $avg: "$rating" },
          },
        },
        {
          $match: { avgRating: { $gte: Number(minRating) } },
        },
      ]);

      const bookIds = stats.map((s) => s._id.toString());
      books = books.filter((b) => bookIds.includes(b._id.toString()));
    }

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBooksPaginated = async (req,res) =>{
    try{
        const page = parseInt(req,query.page) || 1
        const limit = parseInt(req,query,limit) || 10
        const sortBy = req.body.sortBy || "createdAt"
        const order = req.body.order === "asc" ?  1 : -1;

        //skip document
        const skip = (page -1 ) * limit

        //fetch book
        const books = await Book.find()
        .sort({sortBy:order})
        .skip(skip)
        .limit(limit)

        //total count

        const totalBooks = await Book.countDocuments()

        res.json({
            page,
            totalPages : Math.ceil(totalBooks / limit),
            totalBooks,
            books,
        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
