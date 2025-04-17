const express = require('express');
const router = express.Router();
const User = require('../modules/task.js');

router.get('/', async(req, res) => {
    
    try {
        const users = await User.find();
        res.status(200).json(users);    
    }catch {
        res.status(500).json({message: 'Error fetching users'});
    }
});

router.post('/', async(req, res) => {
    const user =req.body;
    try{
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json({message: 'User created successfully', user: newUser});
    }catch(err){
        res.status(500).json({message: 'Error creating user', error: err.message});
    }
     
})

module.exports = router;