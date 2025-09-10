import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongodb Connected");
        
    }catch(err){
        console.error('mongodb is not connected',err.message);
        process.exit(1)    
    }
}

export default connectDB