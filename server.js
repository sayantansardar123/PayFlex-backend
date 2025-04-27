const express = require('express')
const app = express();
const connectDB = require('./db/db')
let cors = require('cors')

app.use(express.urlencoded({ extended: true })) // middleware
app.use(express.json());

connectDB();
app.use(cors())

const usersRoute = require('./routes/user.route')
app.use("/auth", usersRoute);

app.listen(5000, () => {
    console.log("server is listening on port 5000");
})

// ----------------------------------------------
// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/auth', require('./routes/user.routes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// ----------------------------
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./db/db');
// const usersRoute = require('./routes/user.route');
// const { sendOTP, verifyOTP } = require('./utils/mail.utils');

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Connect Database
// connectDB();

// // Routes
// app.use("/auth", usersRoute);

// // OTP Routes
// app.post('/send-otp', async (req, res) => {
//   const { email } = req.body;
//   try {
//     await sendOTP(email);
//     res.status(200).json({ success: true, message: 'OTP sent to your email!' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ success: false, message: 'Failed to send OTP.' });
//   }
// });

// app.post('/verify-otp', (req, res) => {
//   const { email, otp } = req.body;
//   if (verifyOTP(email, otp)) {
//     res.status(200).json({ success: true, message: 'OTP verified successfully!' });
//   } else {
//     res.status(400).json({ success: false, message: 'Invalid OTP.' });
//   }
// });

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT} 🚀`);
// });
