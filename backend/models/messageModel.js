const mongoose=require('mongoose');
const validator=require('validator');

const messageSchema=new mongoose.Schema({
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
    message:{
        type:String,
        required:[true,"Please enter the message"]
    }
})
const messageModel=mongoose.model('Message',messageSchema);
module.exports=messageModel;