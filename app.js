//PACKAGES //

const express=require("express")
const User=require("./routes/users")
const Product=require("./routes/createProduct")
const Order=require("./routes/orders")
const erros=require("./controllers/errorHandling")
//for handling data in the body
const bodyParser=require("body-parser")
//for metadata in the console
const morgan=require("morgan")
//for database and handling database
const mongoose=require("mongoose")
//connect with MongoDB database via link
const databaseName = 'mongo_db'; 

mongoose.connect(`mongodb+srv://aljosakorosec123:geslo123@node-app-shop.otmghlo.mongodb.net/${databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//

const app=express();



//metadata in the console
app.use(morgan("dev"))
//types of data we will receive-->JSON and URL
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//public accessible images
app.use(express.static("uploads"))

//Login,Signup,delete,patch,get profiles for users/admins in the the E-commerce shop
app.use("/users",User)

//creating/deleting/updating/getting all the products
app.use("/product",Product)

//making/deleting orders
app.use("/order", Order)

//error handling-->if nothing above is found it displays this
app.use(erros.error)
app.use(erros.error2)


module.exports=app;