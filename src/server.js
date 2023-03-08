import  Express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import allRoutes from "./routes/allRoute.js"
import mongoose from "mongoose";

// mongoose.set('strictQuery',false);


// configuring dotenv

dotenv.config();
// create server instance
 const app = Express();
 
 //use of cors and bodyparser
app.use(cors())
app.use(bodyParser.json())

//route- home route
app.get("/",(req, res) => {
res.status(200).send("welcome to our api home page")
})

 //
 app.use("/api/v1", allRoutes)

// define some variables
 const port= process.env.PORT;
 const host=process.env.HOST
 //database connection instance
 const con = () => mongoose.connect(process.env.MONGODB_URL,{
   useNewUrlParser:true,
   useUnifiedTopology:true
  })
 // instance to listen our server 
 const startServer = ()=> app.listen(port);
 Promise.all([con(), startServer()])
 .then(() =>{
   console.log(`Mongodb connected and server listening at http://${host}:${port}`)
 })
 .catch((err) => console.log(err))
 