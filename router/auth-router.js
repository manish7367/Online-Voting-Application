const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth-controller');
const authenticate = require('../middleware/authenticate');
const multer  = require('multer');
const User = require('../models/user-model');
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now()+"-"+file.originalname);
//   }
// })

const imgConfig = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"./uploads");
  },
  filename: (req,file,cb)=>{
    cb(null,`image-${Date.now()}.${file.originalname}`);
  }
});

const isImage = (req,file,cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null,true);
  }
  else{
    cb(new Error("Only images are allowed"));
  }
}

const upload = multer({
  storage: imgConfig,
  fileFilter: isImage
});

// const upload = multer({ storage: storage })

router.route('/').get(authControllers.home);

router.route('/register').post(authControllers.register);

router.route('/login').post(authControllers.login);

router.route('/vote').post(authControllers.vote);

router.route('/sendPasswordLink').post(authControllers.sendPasswordLink);

router.route('/validUser').get(authenticate,authControllers.userValid);

router.route('/logOut').get(authenticate,authControllers.logOut);

router.route('/forgotPassword/:id/:token').get(authControllers.verifyUser);

router.route('/:id/:token').post(authControllers.changePassword);

router.route("/edit/:id").put(authControllers.editProfile);

router.route('/updateVoteStatus/:id').put(authControllers.updateVoteStatus);

// router.route('/uploadImage').post(upload.single("image"),authenticate,authControllers.uploads);

// router.route('/img').get(authenticate,authControllers.getProfilePicture);

router.post("/uploadImage",upload.single("image"),authenticate,async(req,res)=>{
  const {filename} = req.file;
  if(!filename){
    res.status(401).json({status:401,message:"Select image to upload"});
  }
  try{
    const userImage = await User.findByIdAndUpdate({_id:req.userId},{imgpath: filename},{new: true});
    res.status(201).json({status:201,message:"Image saved into database",userImage});
  }
  catch(error){
    console.log(error);
    res.status(401).json({status:401,error});
  }
});

router.get("/img",authenticate,async(req,res)=>{
  try {
    const getUser = await User.findOne({_id:req.userId});
    res.status(201).json({status:201,getUser});
  } catch (error) {
    console.log(error);
    res.status(401).json({status:401,error});
  }
});

module.exports = router;