const User = require("../model/user.model");
const { createJWTToken } = require("../utils/user.utils");
// const { createJWTToken, sendTokenByEmail } = require('../utils/user.utils');

module.exports.registerUser = async (req, res) => {
  let { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }
  try {
    let emailUser = await User.findOne({ email: email });
    let phoneUser = await User.findOne({ phone: phone });

    if (emailUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }
    if (phoneUser) {
      return res
        .status(400)
        .json({ success: false, message: "PhoneNo already exists!" });
    }

    user = await User.create({
      username: username,
      email: email,
      phone: phone,
      password: password,
    });

    res
      .status(201)
      .json({
        success: true,
        message: `${user.username} Registered Successfully! ✅`,
      });
  } catch (error) {
    console.error(error); //add
    res
      .status(500)
      .json({ success: false, message: "Internal server problem" });
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not register" });
    }
    let isPasswordMatched = await user.matchPassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json({ success: false, message: "Password Invalid" });
    }

    // generate token
    let token = createJWTToken(user._id, user.username, user.email);

    res.status(201).json({ 
      success: true, 
      message: "Login successfully", 
      token: token 
    });
  } catch (error) {
    console.error(error); //add
    return res.status(500).json({ success: false, message: "Internal server problem" });
  }
};



exports.getUserDetails = async (req, res, next) => {
  try {
    const userData = await User.findOne({ _id: req.userId });
    if (!userData) {
      return res.status(400).send({ message: "User not found" });
    }
    res.status(200).send({ 
      message: "User Retrieved Successfully", 
      user: userData
    });
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
};


exports.getUsernameFromId = async (req, res, next) => {
  try {
    const userData = await User.findOne({ _id: req.params.id });
    if (!userData) {
      return res.status(400).send({ message: "User not found" });
    }
    const { username, email, upiId } = userData;
    const resultObj = { username, email, upiId };
      
    res.status(200).send(resultObj);
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}
