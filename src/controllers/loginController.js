import User from "../model/user.js";
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken";


const login = async(req,res) => {
const {email, password} = req.body
try {
  const user = await User.findOne({email})
  if(!user){
    return res.status(500).json({
        message : "Invalid Credential"
    })
  }else{
    const checkPassword  = await bcrypt.compare(password, user.password)
    if (!checkPassword){
  return res.status(401).json({
    message:"invalid Credentials"
  })
    }else{
      //CREATE AND SIGN A TOKEN
        const token =  Jwt.sign({isAdmin:user.isAdmin}, process.env.SECRETE_kEY,{expiresIn:'1d'})
        // set cookies
          res.cookie("access Token",token,{
           httpOnly:true,
          maxAge:1000*60*60*24*1
             })
            
        return res.status(200).json({
            data:{
              email: user.email,
              isAdmin:user.isAdmin
             },
            token:token
        })
        
        
    }
  }
} catch (error) {
    
}
}
export default login