//import packages
const express=require("express")
const route=express()
const mongoose=require("mongoose")

//importing files
const checkIfAdmin=require("../middleware/Authadmins")
const Product=require("../models/product")
const ProductController=require("../controllers/productController")


//CREATE A PRODUCT-->ONLY ADMINS CAN CREATE PRODUCT-->check their token
route.post("/create",checkIfAdmin,ProductController.createProduct)
//DELETE A PRODUCT-->ONLY FOR ADMINS
 route.delete("/:productId",checkIfAdmin,ProductController.ProductDelete)
 //UPDATE A PRODUCT-->ONLY FOR ADMINS(checkIfAdmin)
route.patch("/:productId",checkIfAdmin,ProductController.productUpdate)
//GET PRODUCTS-->for everyone
route.get("/getAllProducts",ProductController.productgetAll) 

//GET SINGLE PRODUCT-->for everyone
route.get("/:productId",ProductController.productGetOne) 


//export file
module.exports=route