const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const keySecret = process.env.SECRET_KEY;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gaurdian: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    required: true
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  verifytoken: {
    type: String,
  },
  hasVoted: {
    type: Boolean,
    default: false
  },
  imgpath: {
    type: String,
    default: "image-1733161287081.profilePicture.png"
  }
  // path: {
  //   type: String,
  //   default:'uploads\\1732987372199-profilePicture.png'
  // },
  // filename: {
  //   type: String,
  //   default: '1732987372199-profilePicture.png'
  // }
});

userSchema.methods.generateAuthtoken = async function(){
  try{
    let token = jwt.sign({_id:this._id},keySecret,{
      expiresIn: '1d'
    });

    this.tokens = this.tokens.concat({token: token});
    await this.save();
    return token;
  }
  catch(error){
    res.status(422).json(error);
  }
};

const User = new mongoose.model('User',userSchema);

module.exports = User;