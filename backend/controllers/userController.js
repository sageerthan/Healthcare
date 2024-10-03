const catchAsyncError=require('../middlewares/catchAsyncError');
const {ErrorHandler}=require('../middlewares/errorMiddleware');
const userModel=require('../models/userModel');
const cloudinary=require('cloudinary');

exports.registerUser =catchAsyncError(async(req,res,next)=>{
    const{firstName,lastName,email,phone,password,gender,dob,nic,role} =req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password
      ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }
    let user=await userModel.findOne({email});
   
    if(user){
        return next(new ErrorHandler('Already Registered User!',400));
    }
    
        user=await userModel.create({firstName,lastName,email,phone,password,gender,dob,nic,role});
        const token=user.getJwtToken();

        const options={
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
            httpOnly:true
        }
        res.status(201).cookie(user.role==="Patient"?'patientToken':'adminToken',token,options).json({
            success:true,
            message:"Registered successfully",
            token,
            user
        })  
})

exports.loginUser =catchAsyncError(async(req,res,next)=>{
    const {email,password,role}=req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please provide all details",400))
    }
    const user=await userModel.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    if(!await user.comparePassword(password)){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    if(role!==user.role){
        return next(new ErrorHandler("User with this role not found",401));
    }
    const token=user.getJwtToken();
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true
    }
    res.status(201).cookie(user.role==="Patient"?'patientToken':'adminToken',token,options).json({
        success:true,
        message:'Login Successfully',
        token,
        user
    })
})

exports.logoutAdmin=catchAsyncError(async(req,res,next)=>{
    res.cookie('adminToken',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logout Successfully"
    })
})

exports.logoutPatient=catchAsyncError(async(req,res,next)=>{
    res.cookie('patientToken',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logout Successfully"
    })
})

exports.addNewAdmin=catchAsyncError(async(req,res,next)=>{
    const{firstName,lastName,email,phone,password,gender,dob,nic} =req.body;
    if(!firstName || !lastName || !email ||!phone || !password || !gender || !dob || !nic){
        return next(new ErrorHandler("Please provide all details",400))
    }
    let admin=await userModel.findOne({email});
    if(admin){
        return next(new ErrorHandler('Already registered admin',400));
    }

    admin=await userModel.create({firstName,lastName,email,phone,password,gender,dob,nic,role:'Admin'});
    const token=admin.getJwtToken();
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true
    }
    res.status(201).cookie('newAdminToken',token,options).json({
        success:true,
        message:"New Admin Rgistered!",
        token,
        admin
    })
})

exports.getAllDoctors=async(req,res,next)=>{
    const doctors=await userModel.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors
    })
}

exports.getUserDetails=async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user
    })
}

exports.addNewDoctor=catchAsyncError(async(req,res,next)=>{
     
     if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor avatar is required",400));
     }
     const {docAvatar}=req.files;
     const allowedFormats=['image/png','image/jpeg','image/webp'];


     if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format not supported",400));
     }
     const{firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment}=req.body;
     if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !nic ||
        !dob ||
        !gender ||
        !doctorDepartment ||
        !docAvatar
      ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }
     let doctor=await userModel.findOne({email});
     if(doctor){
        return next(new ErrorHandler("Already Registered",400));
     }
     let cloudinaryResponse;
     try {
         cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
     } catch (error) {
         console.error("Cloudinary Error:", error);
         return next(new ErrorHandler("File upload failed", 500));
     }
 
     // Check if the Cloudinary response is valid
     if (!cloudinaryResponse || cloudinaryResponse.error) {
         return next(new ErrorHandler("File upload failed", 500));
     }
     doctor=await userModel.create({firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment,role:"Doctor",
                   docAvatar:{
                     public_id:cloudinaryResponse.public_id,
                     url:cloudinaryResponse.secure_url
                   }
     })
     res.status(201).json({
             success:true,
             message:"Doctor Registered Successfully",
             doctor
     })
})