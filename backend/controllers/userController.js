import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary} from 'cloudinary';


//API to register user
const registerUser = async(req ,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !password || !email){
            return res.json({success:false,message:"Missing Details"})
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email"})
        }

        //validating strong password
        if(password.length<8){
            return res.json({success:false,message:"Password should be at least 8 characters long"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        //saving user document
        const userData = {
            name,
            email,
            password:hashedPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = await jwt.sign({id:user._id},process.env.JWT_SECRET, { expiresIn: '1d' })
        res.json({success:true,message:"User Registered Successfully",token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
 //API for user login
 const loginUser = async(req ,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.json({success:false,message:"Missing Details"})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(isValidPassword){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,message:"User logged in Successfully",token})
        }else{
            return res.json({success:false,message:error.message})
        }   
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
 }
 //API to get user profile data 
 const getUserProfile = async(req,res)=>{
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true,userData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
 }

 // API to update user profile
 const updateUserProfile = async(req,res)=>{
    try {
        const {userId,name,phone,address,dob,gender} = req.body;
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success:false,message:"Missing Details"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        if(imageFile){
            //save to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({success:true,message:"User Profile Updated Successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
 }
export {registerUser,loginUser,getUserProfile,updateUserProfile};