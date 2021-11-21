const express = require("express");
const mongoose =require("mongoose")
const session=require('express-session')
const MongoStore=require('connect-mongo')
const pageRoute=require('./routes/pageRoute')
const courseRoute=require('./routes/courseRoute')
const categoryRoute=require('./routes/categoryRoute')
const userRoute=require('./routes/userRoute')


const app = express();

//Template Engine
app.set("view engine","ejs")



//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(()=>{
  console.log('DB Connected Successfuly')
});


//global varible

global.userIN=null;


//Middlewares

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret:'my_keyboard_cat',
  resave:false,
  saveUninitialized:true,
  store:MongoStore.create({mongoUrl:'mongodb://localhost/smartedu-db'})
}))

const port = 3000;
//Roustes
app.use('*',(req,res,next)=>{
  userIN=req.session.userID;
  next();
})
app.use("/",pageRoute);
app.use("/courses",courseRoute)
app.use("/categories",categoryRoute)
app.use("/users",userRoute)

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
