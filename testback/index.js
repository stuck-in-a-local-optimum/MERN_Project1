const express = require("express"); //imported  //explicitely said that we are using express

const app = express();   //used express

// const port = 3000   //number is totally on us

// app.get('/', (req, res) => res.send('Hello World!'))  //there are couple of request like get, post, delete and put request

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const port = 8000;


//below is what our /signup route will do
app.get("/signup", (req, res)=>{
    return res.send("You are visiting signup route");
});


// app.get("/admin",(req,res)=>{
//     return res.send("This is admin");
// })
//NOW WE WILL MAKE ABOVE ROUTE NOT BY A CALL BACK METHOD


const admin = (req,res)=>{
    return res.send("Home dashboard");
};  


const isAdmin = (req,res, next)=>{
    console.log("isAdmin is running");
    next();
};

const isLoggedIn=(req,res)=>{
    console.log("isLoggedIn is running");
};

app.get("/admin", isLoggedIn, isAdmin, admin);  //isAdmin is a middleware




app.get("/login", (req, res)=>{
    return res.send("You are visiting login route");
});


//
app.listen(port, ()=>{
    console.log("Server is up and running...");
});

