import bcrypt from "bcrypt";
import User  from "../model/user.js"


const signup = async(req,res)=>{
  try {
    const{fullname,email,password}= req.body;
    const findUser= await User.findOne({email})
    if(findUser){
      return res.status(400).json({
        message:"User already exists"
      })
    }else{
      const allUsers= await User.find()
      if(allUsers ==''){
        const hashedPassword= await bcrypt.hash(password, 10)
      const newUser = await User.create({fullname,email,password:hashedPassword,isAdmin:true}) 
      return res.status(201).json({
        message:"User created successfuly",
        data:newUser
      })
      }
      else{
        const hashedPassword= await bcrypt.hash(password, 10)
        const newUser = await User.create({fullname,email,password:hashedPassword,isAdmin:false})
        return res.status(201).json({
          message:"User created successfuly",
          data:newUser
        })
      }
      
    }
    
  } catch (error) {
    return res.status(500).json({
      message:error.message
    })
  }

}
export default signup