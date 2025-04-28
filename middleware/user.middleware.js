const { verifyJWT } = require("../utils/user.utils");

module.exports.isValidUser = async (req, res, next) => {
    let token = req.headers?.authorization;
    if (!token) {
        return res.send({ success: false, message: "please provide JWT" })
    }
    let decodedValue = verifyJWT(token)
    
    req.user = decodedValue;

    if (decodedValue) {
        return next();
    } else {
        return res.send({ success: false, message: "Invalid JWT" })
    }
}
