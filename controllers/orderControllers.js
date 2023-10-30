const Product=require("../models/product")
const Order=require("../models/orders")
const mongoose=require("mongoose")

exports.orderPost=(req,res,next)=>{
    Product.find({_id:req.params.productId}).select("name price size")
    .exec()
    .then(order=>{
        const orders=new Order({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            quantity:req.body.quantity
        })
        orders.save()
        .then(result=>{
            res.json({
                message:"product ordered",
                order:result
            })
        })
        .catch(err=>{
            res.json({
                message:err
            })
        })
    })
    .catch(err=>{
        message:err
    })
}

exports.orderDelete=(req,res,next)=>{
    Order.deleteOne({_id:req.params.orderId}).select("name quantity _id")
    .exec()
    .then(result=>{
        res.json({
            message:"order deleted",
            order:result
        })
    })
    .catch(err=>{
        message:err
    })
}

//GET ALL PRODUCTS
exports.ordersgetall=(req,res,next)=>{
    Order.find().select("name _id quantity ")
    .exec()
    .then(result=>{
        res.status(200).json({
            orders:result.length,
            orders:result
        })
    })
    .catch(err=>{
        res.json({
            message:err
        })
    })
}