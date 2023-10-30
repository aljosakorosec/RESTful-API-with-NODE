//creating schema and then exporting this module
const mongoose=require("mongoose")
//Signup schema
const UserSignUpSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type: String, required: true},
    email:{type:String, required:true, match:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, unique:true},
    password:{type:String, required:true}
})



//export module
module.exports=mongoose.model("Signup", UserSignUpSchema)
