const express = require('express');
const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { registerController, loginController } = require('../controllers/auth.controller.js');

router.post('/register', registerController);

router.post('/login', loginController)

router.get('/user', async(req,res)=>{
    const token = req.cookie.token;

    if(!token){
        res.status(401).json({
            message: "Unauthorized access, no token provided"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({
            _id: decoded.id
        })

        return res.status(200).json({
            message: "User fetched successfully",
            user
        })

    }catch(error){
        res.status(401).json({
            message: "Invalid token"
        })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'User logged out successfully'
    });
});

module.exports = router;