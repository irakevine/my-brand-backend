import query from '../model/query.js'
// import errFunc from "../utils/err.js";

class queryController {

    static async createquery(req,res){
        const {name,email,message} =req.body;
       try {
            const nquery=await query.create({name,email,message})
            console.log(nquery)
            res.status(201).json({
                message:"New query posted Successful",
                data:nquery
            })
       } catch (error) {
        console.log(error);

      res.status(500).json({
        message:"server error"
      });  
    }

    }

    static async getquery(req,res){
        const nquery=await query.find()
        
        try{
            res.status(200).json({
                data:nquery
            })    
       } catch (error) {
            const message=error.message;
            const status=400;
            errFunc(res,message,status)
       }
    }

   

   
 
}

export default queryController;