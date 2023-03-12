import jwt from "jsonwebtoken";

const verifyIsAdmin = (req, res, next) =>{
   const authHeader= req.headers.credentials
   console.log(authHeader)
   if(! authHeader){
      return res.status(401).json({
         message:"no Token provided"
      })
   }else{
     

     try {
      const verifiedUser = jwt.verify(authHeader,process.env.SECRETE_kEY,{expiresIn:'1d'} )
      if(!verifiedUser.isAdmin){
        return res.status(401).json({
         message:"User not Authorized"
        })
      }else{
         console.log("we are in")
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