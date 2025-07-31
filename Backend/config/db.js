import mongoose from "mongoose";
import dotenv  from 'dotenv'
dotenv.config()

const dbConnection = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.DB_URL)
    console.log('connected')
    } catch (error) {
        console.log(error)
    }
    
}


export default dbConnection