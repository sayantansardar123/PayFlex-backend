const jwt = require('jsonwebtoken');


module.exports.createJWTToken = (_id, username, email) => {
    let payload = { _id, username, email };

    let token = jwt.sign(payload, "my-secret", {
        expiresIn: "1d",
    });
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

