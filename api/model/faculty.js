const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Facultyname:String,
    password:String,
    email:String,
    phone:Number,
    gender:String,
    userType:String
})

module.exports=mongoose.model('Faculty',facultySchema)