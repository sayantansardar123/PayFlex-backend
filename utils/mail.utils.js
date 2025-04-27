const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,   },
  });

  app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
  
    otpStore[email] = otp; // Save OTP
  
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: <h1>Your OTP is: ${otp}</h1>,
      });
      res.status(200).json({ message: 'OTP sent to your email!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send OTP.' });
    }
});

app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
  
    if (otpStore[email] && otpStore[email] == otp) {
      delete otpStore[email]; // OTP verified, remove from store
      res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
      res.status(400).json({ message: 'Invalid OTP.' });
    }
});

// -----------------------------------------------------------
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const otpStore = {};

// const sendOTP = async (email) => {
//   const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
//   otpStore[email] = otp;

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Your OTP Code',
//     html: `<h1>Your OTP is: ${otp}</h1>`,
//   });

//   return otp;
// };

// const verifyOTP = (email, otp) => {
//   if (otpStore[email] && otpStore[email] == otp) {
//     delete otpStore[email];
//     return true;
//   }
//   return false;
// };

// module.exports = { sendOTP, verifyOTP };
