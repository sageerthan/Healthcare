const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const userSchema=new mongoose.Schema({
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
    nic:{
        type:String,
        required:[true,"Please enter phone number"],
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"]
    },
    gender:{
        type:String,
        required:true,
        enum:['Male','Female']
    },
    password:{
        type:String,
        required:true,
        minLength:[8,'Password must contain atleast 8 characters'],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Doctor","Patient"]
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String
    }
})

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
const userModel=mongoose.model('User',userSchema);
module.exports=userModel;