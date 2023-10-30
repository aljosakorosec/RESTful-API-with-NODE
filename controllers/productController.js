const mongoose=require("mongoose")
const Product=require("../models/product")

//CREATE A PRODUCT
exports.createProduct=(req,res,next)=>{
    const newProduct=new Product({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        price:req.body.price + "€",
        size:req.body.size + "kg"
    })
    newProduct.save()  
    .then(product=>{
        res.status(200).json({
            message:"product successfully created",
            product:product
        })
    })
    .catch(err=>{
        res.status(400).json({
            message:err
        })
    })
}
//DELETE A PRODUCT
exports.ProductDelete=(req,res,next)=>{
    Product.deleteOne({_id:req.params.productId}).exec()
    .then(result=>{
        res.status(200).json({
            message:"Product deleted",
            result:result
        })
    })
    .catch(err=>{
        res.status(400).json({
            message:err
        })
    })
 }

 //UPDATE A PRODUCT
 exports.productUpdate=(req,res,next)=>{
    Product.updateOne({_id:req.params.productId}, {$set:{
        name:req.body.name,
        price:req.body.price,
        size:req.body.size
    }}).then(result=>{
        res.json({
            message:"product updated",
            newProduct:result
        })
    })
    .catch(err=>{
        res.json({
            message:err
        })
    })
}
//get all the products
exports.productgetAll=(req,res,next)=>{
    Product.find().select("name _id price size").exec()
    .then(result=>{
        res.json({
            numberOfProducts: result.length,
            products:result
        })
    })
    .catch(err=>{
        message:err
    })
}
//GET SINGLE PRODUCT
exports.productGetOne=(req,res,next)=>{
    Product.find({_id:req.params.productId}).select("name _id price size").exec()
    .then(result=>{
        res.json({
            product:result
        })
    })
    .catch(err=>{
        message:err
    })
}
