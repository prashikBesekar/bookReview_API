import express from 'express'
import Book from '../models/Book.js'
import authMiddleware from '../middleware/authMiddleware.js';
import { searchBooks ,getBooksPaginated} from "../controllers/bookController.js";

const router = express.Router()

router.get("/search", searchBooks);

router.get("/",getBooksPaginated)

//view all books
router.get('/', async (req,res)=>{
     try{
        const books = await Book.find().populate("createdBy","name email")

        res.json(books)
     }catch(err){
        res.status(400).json({message:err.message})
        
     }
})

//Add new book
router.post('/',authMiddleware , async (req,res)=>{
    try{
        const {title,author,description} = req.body

        const book = await Book.create({
            title,
            author,
            description,
            createdBy:req.user.id
        })
        res.json(book)
    }catch(err){
        res.status(401).json({message:err.message})
    }
})
//Update

router.put('/:id',async (req,res)=>{
    try{
        const book = await Book.findById(req.params.id);
        if(!book) return res.status(404).json({message:"Book not found"})
        
        if(book.createdBy.toString() !== req.params.id)
            return res.status(404).json({message:"Not authorize"})

        const {title,author,description} = req.body
        book.title = title || book.title;
        book.author = author || book.author;
        book.description = description || book.description


        const updateBook = await book.save()
        res.json(updateBook)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
//delete book

router.delete('/:id',authMiddleware,async (req,res)=>{
    try{
        const book = await Book.findById(req.params.id)
        if(!book) return res.status(404).json({message:"Book not found"})

       if(book.createdBy.toString() !== req.user.id)
        return res.status(401).json({message:"Not authorize"})

       await book.deleteOne();
       res.json({message:"Book deleted"})
    }catch(err){
        res.status(404).json({message:err.message})
    }
})

export default router;

