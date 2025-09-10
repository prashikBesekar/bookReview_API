// routes/reviewRoutes.js
import express from "express";
import { addReview, updateReview, deleteReview  ,getReviews, getBookReviewsWithRating} from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:bookId/reviews",getReviews)

// POST: Add review
router.post("/:bookId/reviews", authMiddleware, addReview);

// PUT: Update review
router.put("/reviews/:reviewId", authMiddleware, updateReview);

// DELETE: Delete review
router.delete("/reviews/:reviewId", authMiddleware, deleteReview);

router.get("/:bookId/reviews", getBookReviewsWithRating);

export default router;
