const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerController(req,res){
    const {username,password} = req.body;

    const existingUser = await userModel.findOne({
        username: username
    })

    if(existingUser){
        return res.status(409).json({message: 'User already exists'});
    }   

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10) // Hashing the password before saving
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {expires: new Date(Date.now() + 3600000), httpOnly: true});

    res.status(201).json({
        message: 'User registered successfully',
        user
    });
}

async function loginController(req, res){
    const {username, password} = req.body;

    const user = await userModel.findOne({
        username: username
    })

    if(!user){
        return res.status(404).json({message: 'User not found'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Comparing the hashed password

    if(!isPasswordValid){
        return res.status(401).json({message: 'Invalid password'});
    }   

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET
    )

    res.cookie('token',token,{expires: new Date(Date.now() + 3600000)});

    res.status(200).json({
        message: 'User logged in successfully',
        user
    });
}

module.exports = {
    registerController,
    loginController
};