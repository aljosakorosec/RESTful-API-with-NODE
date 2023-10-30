const mongoose=require("mongoose")
const OrderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quantity:{type:Number, required:true},
    name:{type:String ,required:true}
})


module.exports=mongoose.model("Orders",OrderSchema)