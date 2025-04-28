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
    console.log("server is listening on port 5000 🚀");
})
