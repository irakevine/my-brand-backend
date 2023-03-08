import jwt from "jsonwebtoken";

const verifyIsAdmin = (req, res, next) =>{
   const authHeader= req.headers.authorization
   if(! authHeader){
      return res.status(401).json({
         message:"no Token provided"
      })
   }else{
     const token = authHeader.split(" ")[1]
     console.log(token)

     try {
      const verifiedUser = jwt.verify(token,process.env.SECRETE_kEY,{expiresIn:'1d'} )
      if(!verifiedUser.isAdmin){
        return res.status(401).json({
         message:"User not Authorized"
        })
      }
      next()

   } catch (error) {
      res.status(500).json({
         message:error.message
      })
   }

   }
};
 
export default verifyIsAdmin