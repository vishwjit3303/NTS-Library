import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import validator from 'validator'
import ErrorHandler from '../utils/errorHandler.js'
import User from '../models/userModel.js'

  

//   Register a user

 export const registerUser = asyncHandler(async (req,res,next)=>{

        
        const {firstlname, lastname, phone, email, password } = req.body
        if(!firstname || lastname || !phone || !email || !password ){
            return  next(new ErrorHandler('All fields mandatory', 400))
        }

        if(!validator.isEmail(email)){ return  next(new ErrorHandler('Please Enter a Correct Email', 400))}
        if(!validator.isMobilePhone(phone, 'any')){return  next(new ErrorHandler('Invalid Phone Number.', 400))}
        if(password.length<6){return next(new ErrorHandler("Password must be at least 6 characters.", 400))}

        const isUser = await User.findOne({email})
            if(isUser) return  next(new ErrorHandler("User already exist", 400))
        
        const hashPass = await bcrypt.hash(password,10)  

        const createUser = await User.create({firstname,phone,email,password:hashPass})
         
        if(createUser){
            const accessToken = jwt.sign({
                firstname : createUser.firstname,
                lastname  : createUser.lastname,
                email : createUser.email,
                id : createUser._id
               },process.env.JWT_TOKEN,
            { expiresIn: "5h" }
        )

            return res.status(200).json({
                id : createUser._id,
                firstname : createUser.firstname,
                lastname  : createUser.lastname,
                email : createUser.email,
                phone : createUser.phone,
                token : accessToken
            })

        

    } 
})


//  Login a user

export const loginUser = asyncHandler(async(req,res)=>{
     
        const{email, password} = req.body
    if(!email || !password){ return  next(new ErrorHandler('All fields mandatory', 400))}
   
    const isUser = await User.findOne({email})
    if(isUser && (await bcrypt.compare(password, isUser.password))){
        const accessToken = jwt.sign({
            isUser : { 
                firstname : isUser.firstname,
                lastname   : isUser.lastname,
                email : isUser.email,
                id : isUser._id,
            }
         },process.env.JWT_TOKEN,
         { expiresIn: "2h" })

         res.cookie("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict", 
            maxAge: 2 * 60 * 60 * 1000, 
          });


         return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
              id: isUser._id,
              firstname: isUser.firstname,
              lastname  : isUser.lastname,
              email: isUser.email,
            },
        }) 


     } else{
        return next(new ErrorHandler('Email or Password does not match', 400))
     }
    

})

  
// Forget Password --- Reset Again
export const resetPassword = asyncHandler(async(req,res)=>{
   
    const isUser = await User.findOne({email: req.body.email});
    if(!isUser){return next(new ErrorHandler('User not found', 404))}

    const newPass = req.body.password;
    const hashPass = await bcrypt.hash(newPass,10)  

    isUser.password = hashPass;
    const updatePass = await isUser.save()

    res.status(200).json({message:" Password updated successfully", 
        id : updatePass.id,
        email:updatePass.email
    })

})



//  Logout user
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });




//  Update a user
//  user/update/:id

 

export const updateUser = asyncHandler(async (req, res, next) => {
  const isUser = await User.findById(req.params.id);

  if (!isUser) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  const userFields = ["firstname", "lastname", "email", "password"];

  for (let field of userFields) {
    if (req.body[field]) {
      if (field === "password") {
        isUser.password = await bcrypt.hash(req.body.password, 10);
      } else {
        isUser[field] = req.body[field];
      }
    }
  }

  const updatedUser = await isUser.save();

  res.status(200).json({
    message: "User updated successfully",
    id: updatedUser._id,
    firstname: updatedUser.firstname,
    lastname : updateUser.lastname,
    email: updatedUser.email,
  });
});


//  Delete a user 
// routes user/delete/:id
export const deleteUser = asyncHandler(async(req,res)=>{
        
        const isAvail = await User.findById(req.params.id)
        if(!isAvail){
            return  next(new ErrorHandler("Please signup", 400))
            }

       await User.deleteOne({ _id:req.params.id})

        res.status(200).json({deletedUser : isAvail, message:"User deleted Successfully"})
       
    
})


//  Get current user

export const currentUser = asyncHandler(async (req, res)=>{
    res.json(req.user)
})