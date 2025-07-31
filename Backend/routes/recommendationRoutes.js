import express from 'express'
const router = express.Router()
import authToken from "../middlewares/authMiddleware.js"
import { recommendation } from '../controllers/recommendControllers.js'


router.get("/recommend", authToken, recommendation )
export default router