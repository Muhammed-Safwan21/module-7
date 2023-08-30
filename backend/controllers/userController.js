const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "../config/config.env" });

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
   
  res.cookie("jwt", token, {
    withCredentials:false, 
    // credentials: 'include',
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  
};

module.exports.loginUser = async (req, res) => {
  try {
    const {  email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        email: user.email,
      });
    } else {
      res.status(401).json({message:"Invalid email or password "});
     ;
    }
  } catch (error) {
    res.status(401);
    throw new Error(error.message)
  }
};

//@desc Register user
//@route POST/api/users
//@access Public

module.exports.registerUser = async (req, res) => {
 try {
  const { username, email, password } = req.body;

  const existUser = await User.findOne({ username });

  if (existUser) {
    res.status(400).json({message:"User already exists"})
  }
  const user = await User.create({
    username,
    email,
    password,
  });
  if (user) {
    generateToken(res, process.env.JWT_SECRET_KEY);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } 
 } catch (error) {
  res.status(400)
  console.log(error)
 }
};

module.exports.logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout sucessfully" });
};
