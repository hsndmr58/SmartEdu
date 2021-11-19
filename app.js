const express = require("express");
const mongoose =require("mongoose")
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

//Middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = 3000;
//Roustes
app.use("/",pageRoute);
app.use("/courses",courseRoute)
app.use("/categories",categoryRoute)
app.use("/users",userRoute)

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
