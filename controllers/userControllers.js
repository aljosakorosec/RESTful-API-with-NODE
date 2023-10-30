
//importing files
const bcrypt=require("bcryptjs")
const NewUser=require("../models/userSignup")
const mongoose=require("mongoose")
const Admin=require("../models/AdminSignUp")
const jwt=require("jsonwebtoken")
//SIGNUP AS USER
exports.SignNewUser=(req,res,next)=>{
    //creating new customer
    bcrypt.hash(req.body.password, 10, (err,hash)=>{
        if(err){
            res.status(500).json({
                message:"something wrong with password",
                error:err
            })
        }else{
            const customer=NewUser({
                _id: new mongoose.Types.ObjectId,
                name:req.body.name,
                email:req.body.email,
                password:hash
            })
            customer.save().then(
                res.status(200).json({
                    customer:customer
                })
            )
            }})
        }

//SIGNUP AS ADMIN
exports.SignUpAdmin=(req,res,next)=>{
    bcrypt.hash(req.body.password, 15, (err,hash)=>{
        if(err){
            return res.status(500).json({
                message:err,
                type:"something wrong with hashing the password"
            })
        }
        else if(hash){
            const newAdmin=new Admin({
                _id:new mongoose.Types.ObjectId,
                email:req.body.email,
                password:hash,
                LevelOfClearence:req.body.LevelOfClearence,
                position:req.body.position
            })
            newAdmin.save()
            .then(result=>{
                const token=jwt.sign({
                    email:req.body.email,
                    password:req.body.password,
                    LevelOfClearence:req.body.LevelOfClearence
                },"admins",{
                    expiresIn:"10h"
                })
                return res.status(200).json({
                    message:"new Admin successfully added",
                    Admin:result,
                    token:token
                })
            })
            .catch(err=>{
                res.send(err)
            }
            )            
        }
    })
}

//LOGIN AS USER + GET TOKEN 
exports.LoginUser=(req,res,next)=>{
    NewUser.find({email:req.body.email}).exec()
    .then(user=>{
        if(user.length<1){
            res.status(404).json({
                message:"user does not exist.You can not log in"
            })
        }else{
            bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
                if(err){
                   return  res.status(500).json({
                        message:"error in comparing the passwords",
                        error:err
                    })
                }else if(result){
                    const token=jwt.sign({
                        name:user[0].name,
                        email:user[0].email,
                        id:user[0]._id
                    },"test123",{//this key applies for when the token is created-->if you change the password now it has no meaning
                        expiresIn:"10h"
                    })
                    return res.status(200).json({
                        message:"auth successful",
                        token:token
                    })
                }
                res.status(500).json({
                    message:"error-->not with comparing but with something else",
                    error:err
                })
            })
        }
            })
        }

//GET ALL THE USERS-->admin authorization
exports.getAllUsers=(req,res,next)=>{
    NewUser.find().select("name email password").exec()
    .then(result=>{
        const response={
            NumberOfUsers:result.length,
            Users: result.map(document=>{
            return{
                _id:document._id,//if I add body between it throws an error
                name:document.name,
                email:document.email,
                password:document.password
            }
        })}
        res.status(200).json(response)
    }).catch(err=>{
        res.status(404).json({
            message:"cant get all users",
            error:err
        })
    })
}

//GET SINGLE USER-->admin authorization
exports.singleUser=(req,res,next)=>{
    
    NewUser.find({_id:req.params.id}).select("name email password").exec()
    .then(result=>{
        if(result.length>0){
            return res.status(200).json({
                message:"you can look at the user",
                user:result,
            })
        }
        res.status(400).json({
            message:"there is no such user"
        })
    })
    .catch(err=>{
        res.status(404).json({
            error:err
        })
    })
    
}

//DELETE USERS ACCOUNT-->ADMIN AUTHORIZATION
exports.Admindeletes=(req,res,next)=>{
    NewUser.deleteOne({_id:req.params.userId}).select("name email password").exec()
    .then(result=>{
        if(result.length>0){
            return res.status(200).json({
                message:"user deleted",
                user:result
            })
        }
        res.json({
            message:"user doesnt exist"
        })
    })
    .catch(err=>{
        res.status(404).json({
            error:err
        })
    })
}
//DELETE USERS ACCOUNT-->CHECK AUTHORIZATION FOR A USER(YOU CAN DELETE A PROFILE IF IS YOUR PROFILE)
exports.Userdelets=(req,res,next)=>{
    NewUser.deleteOne({_id:req.params.userId, password:req.params.userPassword}).select("name email password").exec()
    .then(result=>{
        if(result.length>0){
            return res.status(200).json({
                message:"user deleted",
                user:result
            })
        }
        res.json({
            message:"user doesnt exist"
        })
    })
    .catch(err=>{
        res.status(404).json({
            error:err
        })
    })
}

//UPDATE PROFILE-->CHECK FOR AUTHORIZATION
exports.UpdateProfile=(req,res,next)=>{//even if you only update it checks if it is unique
    try{
        bcrypt.hash(req.body.password, 10,(err,hash)=>{
            if(err){
                res.status(500).json({
                    message:err
                })
            }else if(hash){//it encrypts the updated password
                NewUser.updateOne(
                    {email:req.params.email, password:req.params.hashPassword},
                    {$set:
                        {
                            name:req.body.name,
                            email:req.body.email,
                            password:hash
                            
                        }
                    }).then(result=>{
                        res.status(200).json({
                            message:"update successful",
                            updatedInfo:result
                        })
                    }).catch(err=>{
                        res.json({
                            message:"update unsuccessful",
                            error:err
                        })
                    })
            }
        })
       
    }catch(err){
        res.json({
            error:err
        })
    }
}

