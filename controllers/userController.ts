import User from '../models/User';
import { request, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const newUser = new User({
      username:req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    // Find the userby email or username
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'secret');
    res.header('auth-token', token).json({ token: token, userId: user._id,user:user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
export const getUserById=async(req:Request,res:Response)=>{
  try{
    const user=await User.findById(req.params.id)
    res.json(user)
  }catch(err:any){
    console.log(err.message);
    res.status(500).send("Server Error");
  }
}
