
var mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//some default middlewares we need to use
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


//My Routes
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");




// mongoose.connect('mongodb://localhost/test', { useMongoClient: true }); this code do what below one do to connect with dbs

//CONNECTING TO DATABASE
mongoose
.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
    useCreateIndex:true,
}).then(()=>{
    console.log("DB CONNECTED!")
});


//My Routes
app.use("/api", authRoutes);  //we are prefixing everything with /api i.e we need to run localhost:8000/api/signout instead of localhost:8000/signout
app.use("/api", userRoutes); 

//PORT
const port = process.env.PORT || 8000;  //here we require dotenv


//Starting a server
app.listen(port,()=>{
    console.log(`App is running at ${port}`);
})