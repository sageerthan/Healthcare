const mongoose=require('mongoose');
const validator=require('validator');
const appointmentSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please enter First name"]
    },
    lastName:{
        type:String,
        required:[true,"Please enter Last name"]
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email"]
    },
    phone:{
        type:String,
        required:[true,"Please enter phone number"],
        minLength:[10,"Phone number must contain exact 10 digits"],
        maxLength:[10,"Phone number can't exceed 10 digits"]
    },
    address:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:[true,"Please enter phone number"],
    },
    gender:{
        type:String,
        required:true,
        enum:['Male','Female']
    },
    appointment_date:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    doctor:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    hasVisited:{
        type:Boolean,
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }
})
const appointmentModel=mongoose.model("Appointment",appointmentSchema);
module.exports=appointmentModel;