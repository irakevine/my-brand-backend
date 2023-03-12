import mongoose from 'mongoose'

const querySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true,
        
    }
})

const Query=mongoose.model("Query",querySchema)

export default Query;