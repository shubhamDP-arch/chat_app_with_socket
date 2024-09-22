import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const allUsers = asyncHandler(async(req, res)=>{
  keyword = req.query.search?{
    $or:[
      {name:{$regex: req.query.search, $options:"i"}},
      {email:{$regex: req.query.search, $options:"i"}}
    ]
  }:{};
  const users = await User.find(keyword).find({_id:{$ne: req.user._id}})
  res.send(users);
})

const registerUser = asyncHandler(async(req, res)=>{
  const {name, email,password} = req.body;

  if(!name || !email || !password){
    throw new res.send(ApiError(404, "name or email or password not giben"))
  }
  const userExists = await User.findOne({email})

  if(userExists){
    throw new res.send(ApiError(400, "User already exists"))
  }

  const user = await User.create({
    name,
    email,
    password,
    pic
  })
  if(user){
    return res.send(ApiResponse(201, data, "User data created successfully"))
  }
  else{
    return res.send(ApiError(404, "User not found"))
  }
})

const authUser = asyncHandler( async (req, res)=>{
  const {email, password} = req.body;

  const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))){
    return res.send(ApiResponse(201, data, "User authenticated successfully"))
  }

  else{
    return res.send(ApiError(404, "User not found or password incorrect"))
  }
})

export {registerUser, authUser, allUsers}