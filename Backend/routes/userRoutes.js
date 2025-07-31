import express from 'express'
const router = express.Router()
import authToken from "../middlewares/authMiddleware.js"
import {registerUser, loginUser, resetPassword, logoutUser, updateUser, deleteUser, currentUser} from '../controllers/userController.js'


router.post("/signup",  registerUser )

router.post("/login",   loginUser)

router.post("/resetPass",   resetPassword)

router.post("/logout",   logoutUser)

router.put("/update/:id", updateUser)

router.delete("/delete/:id", deleteUser)

router.get("/currentuser", authToken, currentUser)

export default router