import { Router } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

//Create User
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    
    // Check the user exists
    const existing = await User.findOne({email});
    if(existing) return res.status(400).json({message: "Email already in use"});
    
    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({email: email, passwordHash: passwordHash});
    
    res.status(201).json({id: user._id, email: user.email});
    
});

//User Login
router.post("/login", async (req, res) =>{
    const { email, password} = req.body;
    
    //Attempt to find existing email
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "Email not found"});
    
    //Check is password is correct
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch) return res.status(400).json({message: "Invalid password"});
    
    //Provide access token
    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: "1h"})
})