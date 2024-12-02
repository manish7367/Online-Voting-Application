const User = require('../models/user-model');
const UserVote = require('../models/user-vote-model');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const path = require("path");


const keySecret = process.env.SECRET_KEY


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
});



const home = async(req,res)=>{
  try{
    res.status(200).send("Router Controller");
  }
  catch(error){
    console.log(error);
  }
};

const register = async(req,res)=>{
  try{
  console.log(req.body);
  const {name,dateOfBirth,gaurdian,email,phone,password,aadharNumber,cpassword} = req.body;

  const userExistwithAadhar = await User.findOne({ aadharNumber: aadharNumber});//find nor findOne cannot be used for more than one condition like here I need matching email as well as aadhar number

  const userExistWithEmail = await User.findOne({email: email});

  if(userExistwithAadhar || userExistWithEmail){
    return res.status(400).json({message: "Email or Aadhar Number already exists"});
  }

  const userCreated = await User.create({
    name,
    dateOfBirth,
    gaurdian,
    email,
    phone,
    password,
    aadharNumber,
    cpassword
  });

  res.status(201).json({message: "User Created into database"});
  }
  catch(error){
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

const login = async(req,res)=>{
  try {
    const {aadharNumber,password} = req.body;

    const userWithAadharExist = await User.findOne({aadharNumber});

    if(!userWithAadharExist){
      return res.status(400).json({message: 'Invalid Credentials'});
    }

    const userWithPasswordExist = await User.findOne({password});

    if(userWithPasswordExist){
      const token = await userWithAadharExist.generateAuthtoken();
      // console.log(token);
      res.cookie('userCookie',token,{
        expires: new Date(Date.now()+9000000),
        httpOnly: true
      });
      const result = {
        userWithAadharExist,
        token
      }
      res.status(201).json(result);
      // res.status(200).json({message: 'Login Successful'});
    }
    else{
      res.status(400).json({message: 'Invalid Credentials'});
    }

  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

const vote = async(req,res)=>{
  try {
    const {candidateName,party} = req.body;

    await UserVote.create({
      candidateName,
      party
    });
  
    res.status(201).json({message: "UserVote stored into database"});    
    
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

const sendPasswordLink = async(req,res)=>{
  const {email} = req.body;
  if(!email){
    res.status(401).json({status: 401,message:"Enter your Email"});
  }
  try {
    const userFind = await User.findOne({email: email});
    console.log(userFind);
    const token = jwt.sign({
      _id:userFind._id
    },keySecret,{
      expiresIn: "120s"
    });
    // console.log("token",token);
    const setUserToken = await User.findByIdAndUpdate({_id:userFind._id},{verifytoken:token},{new:true});

    // console.log(setUserToken);
    if(setUserToken){
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email for password reset",
        text: `This link valid for 2 minutes http://localhost:5173/forgotPassword/${userFind.id}/${setUserToken.verifytoken}`
      }

      transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
          console.log("error",err);
          res.status(401).json({status: 401,message:"Email not send"})
        }
        else{
          console.log("Email sent",info.response)
          res.status(200).json({status:200,message:"Email sent successfully"})
        }
      })
    }
    
  } catch (error) {
    console.log(error);
    res.status(401).json({status:401,message:"Invalid User"
    })
  }
}

const userValid = async(req,res)=>{
  try{
  const ValidUserOne = await User.findOne({_id: req.userId});
  res.status(201).json({status: 201, ValidUserOne});
  }
  catch(error){
    res.status(401).json({status: 401,error});
  }
};

const logOut = async(req,res)=>{
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curElem)=>{
      return curElem.token !== req.token;
    });
    res.clearCookie("userCookie",{path:"/"});
    req.rootUser.save();
    res.status(201).json({status:201})
  } catch (error) {
    res.status(401).json({status:401, error})
  }
};

const verifyUser = async(req,res)=>{
  const {id,token} = req.params;
  // console.log(id,token);
  try {
    const validUser = await User.findOne({_id:id,verifytoken: token});
    // console.log(validUser);
    const verifyToken = jwt.verify(token,keySecret);
    console.log(verifyToken);
    if(validUser && verifyToken._id){
      res.status(201).json({status:201,validUser});
    }
    else{
      res.status(401).json({status:401,message:"User does not exist"});
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({status:401,error});
  }
};

const changePassword = async(req,res)=>{
  const {id,token}= req.params;
  const {newPassword} = req.body;

  try {
    const validUser = await User.findOne({_id:id,verifytoken:token});
    const verifyToken = jwt.verify(token,keySecret);

    if(validUser && verifyToken._id){
      const setNewUserPass = await User.findByIdAndUpdate({_id:id},{password: newPassword},{new:true});
      setNewUserPass.save();
      res.status(201).json({status:201,setNewUserPass});
    }
    else{
      res.status(401).json({status:41,message:"User does not exist"});
    }
  } catch (error) {
    res.status(401).json({status:401,error});
  }
};


const editProfile = async(req,res)=>{
  const {id} = req.params;
  const updatedUser = req.body;
  // console.log(id);
  // console.log(req.body);
  try {
    const UpdateUser = await User.findByIdAndUpdate({_id:id},updatedUser);
    // console.log("User updated",UpdateUser);
    res.status(201).json({status:201,UpdateUser});
  } catch (error) {
    console.log(error);
    res.status(401).json({status:401,error});
  }
};

const updateVoteStatus = async(req,res)=>{
  const {id} = req.params;
  const {userVoted} = req.body;
  try {
    const updateUserVoted = await User.findByIdAndUpdate({_id:id},{hasVoted:userVoted});
    res.status(201).json({status:201,updateUserVoted});
  } catch (error) {
   console.log(error); 
   res.status(401).json({status:401,error});
  }
};

// const uploads =  async(req,res)=>{
//   console.log(req.file);
//   // console.log(req.userId);
//   try {
//     const imageSaved = await User.findByIdAndUpdate({_id:req.userId},{path: req.file.path,filename:req.file.filename});
//     res.status(201).json({status:201,imageSaved,message:"Image saved into database"});
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({status:401,error});
//   }
// };

// const getProfilePicture = async(req,res)=>{
//   console.log(__dirname);
//   // try {
//   //   const imageFound = await User.findOne({_id:req.userId});
//   //   const imagePath = path.join("uploads",imageFound.filename);
//   //   res.sendFile(imagePath);
//   // } catch (error) {
//   //   console.log(error);
//   //   res.status(401).json({status:401,message:"Image not found"});
//   // }
// };

module.exports = {
  home,
  register,
  login,
  vote,
  sendPasswordLink,
  userValid,
  logOut,
  verifyUser,
  changePassword,
  editProfile,
  updateVoteStatus,
  // uploads,
  // getProfilePicture
};