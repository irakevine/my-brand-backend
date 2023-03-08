import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
       type: String,
       required: true
    },
    email:{
        type: String,
        unique:true,
        required: true,
        lowercase:true
     },
     password:{
        type: String,
        required: true,
        minLength:6
     },
     isAdmin:{
      type:Boolean
     },
     createdAt:{
        type:Date,
        default:Date.now
     }
});

const User = mongoose.model("User", userSchema)
export default User