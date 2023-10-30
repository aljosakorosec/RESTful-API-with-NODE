const express=require("express")
const user=express.Router()
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
//for protection of a password
const bcrypt=require("bcryptjs")
//importing models 
const NewUser=require("../models/userSignup")
const Admin=require("../models/AdminSignUp")
//importing for authorization
const checkForAuth=require("../middleware/authorization")
const checkIfAdmin=require("../middleware/Authadmins")
//importing controllers
const UserControl=require("../controllers/userControllers")


//SIGNUP AS USER
user.post("/SignUp",UserControl.SignNewUser)

//SIGNUP AS ADMIN-->GIVES YOU SPECIAL TOKEN-->gives you access to other users data
user.post("/AdminSignUp",UserControl.SignUpAdmin)

//LOGIN AS USER-->CHECK IF THE USER EXISTS + give a user their token 
user.post("/Login",UserControl.LoginUser)

//GET ALL THE USERS-->AUTHORIZATION NEEDED-->similar authorization as with users only the key is different
//ONLY THE ADMINS HAVE THE RIGHT TO SEE OTHER PEOPLES DATA
user.get("/data",checkIfAdmin,UserControl.getAllUsers)

//GET SINGLE USER-->AUTHORIZATION NEEDED//this code checkForAuth gives every user their unique token and they can put it in a header and see the other users info
user.get("/:id",checkIfAdmin,UserControl.singleUser)

//DELETE YOUR PROFILE-->checks your login token and the you need to know your id and password in you want to delete your account
user.delete("/:userId/:userPassword",checkForAuth,UserControl.Userdelets)

//DELETE ANY PROFILE IF YOUR AN ADMIN-->YOU DO NOT NEDD THEIR PASSWORD
user.delete("/:userId",checkIfAdmin,UserControl.Admindeletes)
//UPDATE YOUR PROFILE
//search by email and password because together they are unique and known only by the user-->than make sure it is authorized by password maybe in middleware or in the parameters-->password is in the hash obliki
user.patch("/:email/:hashPassword",checkForAuth,UserControl.UpdateProfile)

module.exports=user;