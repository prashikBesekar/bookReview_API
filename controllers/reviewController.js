// controllers/reviewController.js
import Review from "../models/Review.js";
import Book from "../models/Book.js";


export const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;

    // Create Review
    const review = await Review.create({
      book: bookId,
      user: req.user.id, // comes from JWT middleware
      rating,
      comment,
    });

    // Get all reviews for this book
    const reviews = await Review.find({ book: bookId });

    // Calculate new average rating
    const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    // Update book with new stats
    await Book.findByIdAndUpdate(bookId, {
      averageRating,
      reviewCount: reviews.length,
    });

    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controllers/reviewController.js
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Find the review
    let review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Check ownership (only reviewer can update)
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update fields
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    await review.save();

    // Recalculate book rating
    const reviews = await Review.find({ book: review.book });
    const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    await Book.findByIdAndUpdate(review.book, {
      averageRating,
      reviewCount: reviews.length,
    });

    res.json({ message: "Review updated", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controllers/reviewController.js
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Check ownership
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Store bookId before deleting
    const bookId = review.book;

    await review.deleteOne();

    // Recalculate ratings
    const reviews = await Review.find({ book: bookId });
    let averageRating = 0;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
      averageRating = totalRating / reviews.length;
    }

    await Book.findByIdAndUpdate(bookId, {
      averageRating,
      reviewCount: reviews.length,
    });

    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
export const getReviews = async (req,res) =>{
    try{
        const {bookId} = req.body

        //query params
        const page = parseInt(req.query.page) || 1 ;
        const limit = parseInt(req.query.limit) || 10;
        const sortBy = req.query.sort || "newest"
        const search = req.query.search || "";
        const ratingFilter = req.query.rating ? parseInt(req.query.rating) : null;

        const skip = (page -1) * limit;

        //sorting logic

        let sortOption = {createdAt : -1};
        if (sortBy === "oldest") sortOption = {createdAt:1}
        if (sortBy === "rating") sortOption = {rating : -1}
        
        //filter logic
        let query = {book:bookId}
        //filter by rating
        if(ratingFilter) query.rating = ratingFilter

        //search inside comment
        if(search) query.comment = {$regex : search,$options :"i"}

        //get Review
        const reviews = await Review.find({book:bookId})
        .populate("user","name email")
        .sort(sortOption)
        .skip(skip)
        .limit(limit)

        //count total review
        const totalReview = await Review.countDocuments({book:bookId})

        res.json({
            page,
            limit,
            totalReview, 
            totalPages : Math.cell(totalReview / limit),
            reviews
        })
    }catch(err){
      res.status(404).json({message:err.message})
    }
}

export const getBookReviewsWithRating = async (req,res) =>{
  try{
    const {bookId} = params.id
     
    //Avg rating book review
    const stats = await Review.aggregate([
      {$match:{book: new mongoose.Types.ObjectId(bookId)}},
      {
        $group : {
          _id : "$books",
          avgRating : {$avg :"$Rating"},
          totalReview :{$sum:1}

        }
      }
    ])
    //fatch all review
    const reviews = await Review.find({book:bookId})
    .populate("user","name gmail")

    res.json({
      avgRating :stats[0]?.avgRating || 0,
      totalReview : stats[0]?.totalReview || 0,
      reviews

    })
  }catch(err){
    res.status(500).json({message:err.message})
  }
}