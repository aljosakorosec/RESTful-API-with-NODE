//creating schema and then exporting this module
const mongoose=require("mongoose")
//product schema
const ProductSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type: String, required: true},
    price:{type:mongoose.Schema.Types.Mixed, required:true},
    size:{type:mongoose.Schema.Types.Mixed, required:true},
})



//export module
module.exports=mongoose.model("Product", ProductSchema)