const mongoose=require("mongoose")
const AdminsSignUpSchema=mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    email: {type: String, unique:true, match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, required:true},//email needs to be unique you cant be user and an admin
    password:{type:String, required:true},
    LevelOfClearence: {type: Number, required:true},
    Position: {type: String}
})
module.exports=mongoose.model("AdminSignUp",AdminsSignUpSchema)