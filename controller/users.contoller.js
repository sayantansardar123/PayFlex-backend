const User = require('../model/user.model');
const { createJWTToken } = require('../utils/user.utils');
// const { createJWTToken, sendTokenByEmail } = require('../utils/user.utils');


module.exports.register = async (req, res) => {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ success: false, message: "All fields are required!" })
    }
    try {
        let user = await User.findOne({ email: email })
        if (user) {
           return  res.status(400).json({ success: false, message: "Email already exists!" })
        }
        user = await User.create({
            username: username,
            email: email,
            password: password,
        })

        res.status(201).json({ success: true, message: `${user.username} Register Successfully! ✅` })
    } catch (error) {
        console.error(error); //add
        res.status(500).json({ success: false, message: "Internal server problem" })
    }
}
module.exports.login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" })
    }

    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not register" })
        }
        let isPasswordMatched = await user.matchPassword(password);

        if (!isPasswordMatched) {
            return res.status(400).json({ success: false, message: "Password Invalid" })
        }

        // generate token
        let token = createJWTToken(user._id, user.username, user.email);

        res.status(201).json({ success: true, message: "Login successfully", token: token })
    } catch (error) {
        console.error(error); //add
        return res.status(500).json({ success: false, message: "Internal server problem" })
    }
}

module.exports.profile = async (req, res) => {

    // return res.send({ success: true, data: req.user })
    return res.status(200).json({ success: true, data: req.user });

}

