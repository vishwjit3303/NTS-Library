import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import cors from 'cors'
import userRoute from './routes/userRoutes.js'
import recommend from './routes/recommendationRoutes.js'
import errMiddleware from './middlewares/errorMiddleware.js'


dotenv.config()

const app = express()

app.use(cors());
app.use(express.json());  
                               
app.use(express.urlencoded({ extended: true }));        

app.use('/nts/user', userRoute, recommend)


dbConnection()


app.listen(process.env.PORT, ()=>{
    console.log('server is listening on port 400')
}) 

app.use(errMiddleware)