const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routers/user.js');


const app = express();
app.use(cors());

app.use(express.json());


app.use('/api/users', router);  


// create mongodb connection
mongoose.connect("mongodb+srv://shehan:shehan123@cluster0.jlmcfo9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully!");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})



