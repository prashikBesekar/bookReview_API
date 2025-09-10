import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import authRoutes from './routes/authRoute.js'  
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js"
import userRoute from "./routes/authRoute.js"

dotenv.config()

const app = express()

//connect DB

connectDB()

//Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//paths
app.use('/api/auth', authRoutes)

//books path
app.use('/api/books',bookRoutes)

//review books
app.use("/api/books", reviewRoutes);

app.use("/api/users", userRoute);



const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`server connect on ${PORT}`))