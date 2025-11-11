// models/Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: String,
  averageRating: {
    type: Number,
    default: 0, // starts at 0
  },
  reviewCount: {
    type: Number,
    default: 0, // no reviews yet
  },
 totalReviews: 
 { type: Number, default: 0 } 

},
{ timestamps: true }
);

export default mongoose.model("Book", bookSchema);
