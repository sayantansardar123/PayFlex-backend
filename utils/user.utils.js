// const jwt = require('jsonwebtoken')
// module.exports.createJWTToken = (_id, username, email) => {
//     let payload = {
//         _id,
//         username,
//         email,
//     }

//     let token = jwt.sign(payload, "my-secret", {
//         expiresIn: "1d",
//     })
//     console.log(token);

//     return token;
// }

// module.exports.verifyJWT = (token) => {
//     try {
//         let decoded = jwt.verify(token, 'my-secret');
//         return decoded;
//     } catch (error) {
//         return false
//     }
// }


const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Existing function (your JWT creation)
const createJWTToken = (id, username, email) => {
    return jwt.sign({ id, username, email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

// New function (send token via email)
const sendTokenByEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Login Token',
        html: `<h1>Your Login JWT Token</h1><p>${token}</p>`,
    });
};

module.exports = { createJWTToken, sendTokenByEmail };