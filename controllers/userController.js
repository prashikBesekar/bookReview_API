import User from "../models/User";
import Review from "../models/Review";

export const getUserProfile = async (req,res) =>{
    try{
        const {userId} = req.params;

        //find user
        const user = await User.findById(userId).select("-password")
        if (!user) return res.status(401).json({message:"user not found"})

       //find all review written by this user
       const review = await Review.find({user:userId})
       .populate("book","title author")
       .sort({createdAt : -1})

       res.json({user,review})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}