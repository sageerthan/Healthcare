const catchAsyncError=require('../middlewares/catchAsyncError');
const {ErrorHandler}=require('../middlewares/errorMiddleware');
const appointmentModel=require('../models/appointmentModel');
const userModel = require('../models/userModel');

exports.postAppointment=catchAsyncError(async(req,res,next)=>{
    const{firstName,lastName,email,phone,address,nic,gender,appointment_date,department,doctor_firstName,doctor_lastName,hasVisited,dob}=req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address
      ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }
    const isConflict=await userModel.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDepartment:department
    });

    if(isConflict.length ===0){
        return next(new ErrorHandler('Doctor not found!',404));
    }
    if(isConflict.length>1){
        return next(new ErrorHandler('Doctors Conflict! Please contact through email or phone!',404));
    }
    const doctorId=isConflict[0]._id;
    const patientId=req.user._id;

    const appointment=await appointmentModel.create({
        firstName,lastName,email,phone,address,nic,gender,appointment_date,department,
        doctor:{
            firstName:doctor_firstName,
            lastName:doctor_lastName
        },
        hasVisited,doctorId,patientId
    });
    res.status(200).json({
        success:true,
        message:"Appointment Sent Successfully",
        appointment
    })
})

exports.getAllAppointments=catchAsyncError(async(req,res,next)=>{
    const appointments=await appointmentModel.find();
    res.status(200).json({
        success:true,
        appointments
    })
})

exports.updateAppointmentStatus=catchAsyncError(async(req,res,next)=>{
    let appointment=await appointmentModel.findById(req.params.id);
    if(!appointment){
        return next(new ErrorHandler("There is no appointment"));
    }
    appointment.status=req.body.status;
    await appointment.save();

    res.status(200).json({
        success:true,
        message:"Appointment Status Updated"
    })
})

exports.deleteAppointment=catchAsyncError(async(req,res,next)=>{
    let appointment=await appointmentModel.findById(req.params.id);
    if(!appointment){
        return next(new ErrorHandler("There is no appointment"));
    }
    await appointment.deleteOne();

    res.status(200).json({
        success:true,
        message:"Appointment Deleted"
    })

})


