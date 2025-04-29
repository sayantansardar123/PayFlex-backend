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
    origin: [process.env.FRONTEND_URL], 
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

// Routes Middleware
app.use('/auth', usersRoute);     
app.use('/mail', mailRoutes);     

// Default route 
app.get('/', (req, res) => {
    res.send('PayFlex Backend API Running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🚀`);
});
