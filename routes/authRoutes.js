const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const router=express.Router();

//Register Route
router.post('/register',async(req,res)=>{
    const {username, email, password}=req.body;

    try{
        const hashedPassword=await bcrypt.hash(password, 10);
        const newUser=new User({username, email, password:hashedPassword});
        await newUser.save();
        res.status(201).json({message: "User registered"});
    } catch (error){
        res.status(500).json({ error: error.message});
    }
});

//Login Route
router.post('/login', async(req,res)=>{
    const{email, password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message: 'User not found'});

        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token=jwt.sign({id:user_id}, process.env.JWT_SECRET, {expiresIn:'1h'});
        res.json({token});
    } catch (error){
        res.status(500).json({error: error.message});
    }
});

module.exports=router;

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
