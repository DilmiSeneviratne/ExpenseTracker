const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=express.Router();

//Register Route
Router.post('/register',async(req,res)=>{
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