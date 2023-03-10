const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:Number,
        require:true,
        unique:true
    },
    
    password:{
        type:String,
        require:true,
    },
    confirmpassword:{
        type:String,
        require:true,
    }
})


// Create collections


const Register = new mongoose.model("Register", customerSchema);

module.exports = Register;
