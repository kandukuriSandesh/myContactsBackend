const asyncHandler = require('express-async-handler');
const User = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const registerUser = asyncHandler(async (req,res) => {
    const {username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email:email})
    console.log(user)
    if(user){
        res.status(400);
        throw new Error("Email already exist")
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await User.create({
        username,
        email,
        password:hashedPassword
    })

    res.status(201).json(newUser)
 })

const loginUser = asyncHandler(async(req,res) => {
    let token;
    const {email,password} = req.body;
    const userDetails = await User.findOne({email:email})
    console.log(userDetails);
    if(!userDetails){
        res.status(404)
        throw new Error('User Not Registered');
    }
   const verified =  await bcrypt.compare(password,userDetails.password);
   console.log(verified)
   if(verified){
    token =  jwt.sign({
        user:{
            username:userDetails.username,
            email:userDetails.email,
            id:userDetails.id
        },
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:'30m'
    }
    )
   }
   res.status(200).json({token})
 })

const currentUser = asyncHandler((req,res) => {
    console.log(req.user)
    res.status(200).json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}


