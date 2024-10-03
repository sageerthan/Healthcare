const catchAsyncError = require('../middlewares/catchAsyncError');
const { ErrorHandler } = require('../middlewares/errorMiddleware');
const messageModel =require('../models/messageModel')
exports.sendMessage=catchAsyncError(async(req,res,next)=>{
    const {firstName,lastName,email,phone,message}=req.body;
    
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please Fill Full Form",400));
    }
     
       const messages=await messageModel.create({
        firstName,lastName,email,phone,message
       })
       res.status(200).json({
        success:true,
        message:"Message Send Successfully",
        messages
       })
})

exports.getAllMessages=catchAsyncError(async(req,res,next)=>{
    const messages=await messageModel.find();
    res.status(200).json({
        success:true,
        messages
    })
})