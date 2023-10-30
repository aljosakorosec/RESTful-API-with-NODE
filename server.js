//creating server + importing files and packages

const http=require("http");
const port= process.env.PORT || 5000;
//import main file -- app.js
const app=require("./app.js")

const server=http.createServer(app);
server.listen(port)

