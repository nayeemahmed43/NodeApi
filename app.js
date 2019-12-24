const express = require("express");
const app = express();
const connectDB = require("./DB/connection")
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const expressValidator = require("express-validator");
// const {createPostValidatoer} = require("./validator")

const morgan = require("morgan");

//db
connectDB();

//bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

//middleware

app.use(morgan("dev"));
//app.use(expressValidator());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", postRoutes);
app.use("/", authRoutes);



const Port = process.env.Port||8080;
app.listen(Port, () =>{
    console.log(`A Node Js API is listening on port: ${Port}`);
});