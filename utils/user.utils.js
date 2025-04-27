const jwt = require('jsonwebtoken')
module.exports.createJWTToken = (_id, username, email) => {
    let payload = {
        _id,
        username,
        email,
    }

    let token = jwt.sign(payload, "my-secret", {
        expiresIn: "1d",
    })
    console.log(token);

    return token;
}

module.exports.verifyJWT = (token) => {
    try {
        let decoded = jwt.verify(token, 'my-secret');
        return decoded;
    } catch (error) {
        return false
    }
}

// const jwt = require('jsonwebtoken');

// module.exports.createJWTToken = (_id, username, email) => {
//     const payload = { _id, username, email };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    // console.log(token);
//     return token;
// }

// module.exports.verifyJWT = (token) => {
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         return decoded;
//     } catch (error) {
//         return false;
//     }
// }
