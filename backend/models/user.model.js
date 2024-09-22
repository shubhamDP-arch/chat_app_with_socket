// create userSchema, with name email, password pic, isAdmin, match password -- method, pre method

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name:{
    type:"String",
    required:true
  },
  email:{
    type:"String",
    unique: true,
    required:true
  },
  password:{
    type:"String",
    unique:true,
    required:true
  },
  pic:{
    type:"String",

  },
  isAdmin:{
    type:Boolean,
    required:true,
    default:false,
  },
},
  {
    timestamps:true
  }
)

userSchema.methods.matchPassword = async function(Password){
  return await bcrypt.compare(Password, this.password)
}

userSchema.pre("save", async function(next){
  if(!this.isModified){
    next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.generateToken = async function(id){
  return jwt.sign({id}), process.env.JWT_SECRET, {expiresIn: "30d"}
}

export const User = mongoose.model("User", userSchema);