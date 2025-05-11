const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/db');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.FRONTEND_HOST], 
  credentials: true,
}));
  
// Debug logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

connectDB();

const usersRoute = require('./routes/user.route');
const mailRoutes = require('./utils/mail.utils');
const transactionRoutes = require('./routes/transactionRoute');
const bankAccountRoutes = require('./routes/bankAccountRoutes');

// Routes Middleware
app.use('/api/v1/auth', usersRoute);     
app.use('/api/v1/mail', mailRoutes);     
app.use('/api/v1', transactionRoutes);
app.use('/api/v1', bankAccountRoutes);

// Default route 
app.get('/', (req, res) => {
    res.send('PayFlex Backend API Running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🚀`);
});
