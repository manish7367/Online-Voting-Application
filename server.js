require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const router = require('./router/auth-router');
const connectDb = require('./utils/db');

const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/uploads",express.static("./uploads"));

app.use(cookieParser());

app.use('/api/auth',router);


// app.get('/api/auth/img',authenticate,async(req,res)=>{
//   // console.log(__dirname);
//   try {
//     const imageFound = await User.findOne({_id:req.userId});
//     const imagePath = path.join(__dirname,"uploads",imageFound.filename);
//     res.sendFile(imagePath);
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({status:401,message:"Image not found"});
//   }
// });

const PORT = 5000;

connectDb().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server is running at port: ${PORT}`);
  });
});