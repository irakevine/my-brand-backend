import Blog from "../model/blogs.js";


class blogController{
 //CRUD (Create Read Update Delete)    
//get all blogs
static async getBLogs(req, res){
    try {
        const blogs = await Blog.find() 
        res.status(200).json({
            data : blogs
        })
    } catch (error) {
        console.log(error);

      res.status(500).json({
        message:"server error"
      });  
    }
}
//get one blog
static async getBlog(req, res){
    const { id }  = req.params;
    
    const blog = await Blog.findOne({_id:id})
    if(!blog){

        return res.status(404).json({
               message: `blog with id: ${id} was not found`
         })
     } else{
          return res.status(200).json({
             data: blog
         });
     }
}

//create Blog

static async createBlog(req, res){
    try {
        const {title , content,imageUrl} = req.body;
        const findBlogs= await Blog.findOne({content})
        if(findBlogs){
          return res.status(400).json({
            message:"Blogs already exists"
          })
        }
        const newBlog = await Blog.create({title , content,imageUrl});
        res.status(201).json({
            message:"new blog created successfully",
            data:newBlog
        })
    } 
    catch (error) {
        
        res.status(500).json({
          message:error

        }); 
    } 
    
}

//update blog
static async updateBlog(req, res){
    try {
        const {id}=req.params;
        
        //body tobe updated
        const{title,content,imageUrl} = req.body;
        //id
        const _id = id
        const blogUpdated = await Blog.findByIdAndUpdate({_id},{title,content,imageUrl},{new:true}) 

        if(!blogUpdated){

           return res.status(404).json({
                  message: `blog with id: ${id} was not found`
            })
        } else{
             return res.status(200).json({
                message:" blog updated Successfully",
                data: blogUpdated
            });
        }
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
          message:"server error"
        }); 
    }
  }

//delete Blogs
static async deleteBlog(req,res){
    try {
        const {id} = req.params;
        const _id = id
        const blogToBeDelete = await Blog.findByIdAndDelete(_id)
        if(!blogToBeDelete )
        {
            return res.status(404).json({
                message: `blog with id: ${id} was not found`
          });
        }else{
             return res.status(200).json({
                message:"blog Deleted successfully"
             })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message:"server error"
        });  
    }
}

// Create comments

    static async createComment(req, res){

        try {
            // Catch blog id from the request params
            const { id } = req.params;
      
            // Catch comment attributes from the request body
            const { name, email, comment } = req.body;
      
            console.log(req.body);
      
            // Find the blog with the id and push the comment attributes to the comments array
            const blog = await Blog.findById(id);
            blog.comments.push({ name, email, comment, createdAt: Date.now() });
      
            // Save the blog
            await blog.save();
      
            // Send a response
            res.status(201).json({
              message: "Comment added successfully",
            });
      
            // Catch any errors
          } catch (error) {
           console.log(error);
          }

    }

}
export default blogController