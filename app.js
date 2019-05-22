const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser')
dotenv.config();

//Import Router
const authRouter = require('./routes/auth');

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })



//MiddleWare
app.use(express.json());


//Router middlewares
app.use('/api/user', authRouter);
app.listen(5200, () => {
    console.log('Server is running');
});
