const express=require("express")
const route=express.Router()
const mongoose=require("mongoose")

const checkForAuth=require("../middleware/authorization")
const Product=require("../models/product")
const Order=require("../models/orders")
const orderController=require("../controllers/orderControllers")
//POST THE ORDER->no authorization needed
route.post("/:productId",orderController.orderPost)

//DELETE AN ORDER
route.delete("/:orderId",orderController.orderDelete)

//GET ORDERS
route.get("/getAll",orderController.ordersgetall)

module.exports=route