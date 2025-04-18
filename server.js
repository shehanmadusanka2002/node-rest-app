const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routers/user.js');
const dotenv = require('dotenv');
require('dotenv').config();



const app = express();
app.use(cors());

app.use(express.json());


app.use('/api/users', router);  


// create mongodb connection
mongoose.connect(process.env.Mongodb_Url, {
    //
}).then(() => {
    console.log("MongoDB connected successfully!");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})



