const userModel = require("../models/userModel");
const catchAsyncError = require("./catchAsyncError");
const { ErrorHandler } = require("./errorMiddleware");
const jwt=require('jsonwebtoken');
exports.isAuthenticatedAdmin=catchAsyncError(async(req,res,next)=>{
    const token=req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Login first to handle resourse",401));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user= await userModel.findById(decoded.id);
    if (req.user.role !== "Admin") {
        return next(
          new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
        );
      }
    next();
})

exports.isAuthenticatedPatient=catchAsyncError(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Login first to handle resourse",401));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user= await userModel.findById(decoded.id);
    if (req.user.role !== "Patient") {
        return next(
          new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
        );
      }
    next();
})
