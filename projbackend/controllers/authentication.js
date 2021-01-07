
//NOTE: ALWAYS MAKE SURE THE ROUTE NAME AND CONTROLLER NAME IS SAME (e.g here authentication.js)

const User = require("../models/user.js");  //RECOMMNEDED to name this object as same as we exported in user.js
const { use } = require("../routes/authentication.js");
var jwt = require('jsonwebtoken');  //used to create token based on a key-value pair
var expressJwt = require('express-jwt');

const { validationResult } = require("express-validator");

exports.signup = (req,res)=>{
    // console.log("REQ BODY", req.body);
    // res.json({
    //     message:"signup route works!"
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((ERROR, user)=>{
        if(ERROR || !user){
            return res.status(400).json({  //400 is status code for bad request
                ERROR: "NOT abe to save user in DB"
            })
        }
        //res.json(user)  //else print entire user
        res.json({  //but we want to throw some specific details only!
            name:user.name,
            email:user.email,
            id:user._id
        })
    })
};




exports.signin=(req, res)=>{
    const {email, password} =  req.body;  //destruturing of data 
    const errors = validationResult(req);


    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()[0].msg
        });
    }

    User.findOne({email},(ERROR, user)=>{  //findOne based on email that we have destructured //always return error or object itself
        if(ERROR){
            res.status(400).json({
                error:  "USER EMAIL DOESN'T EXIST" 
            })
        }
        //if user's email exist in  database then we gonna authenticate that his/her password correct or not
         if(!user.authenticate(password)) {
             return res.status(401).json({
                 error: "Email and password do not matched!"
             })
         }
         
         //if the user is authentic then let them sign in

         //create token
         const token = jwt.sign({ _id: user._id}, process.env.SECRET);

         //put token in user's cookie(cookie is info in key-value pair)
         res.cookie("token", token, {expire: new Date()+9999}); //named cookie as token and pass its value as token created above //with any kind of expiry date
        

         //send response to front end
         const {_id, name, email, role}=user;   //destructuring the data
        return res.json({ token, user : {_id, name, role} }); //we want to send a token so that frontend application to stored it localStorage

         
    });

}

exports.signout = (req, res)=>{  //this will export it from authentication file in routes
    res.clearCookie("token");  //clear the cookie whose name is token //we can use this method becuase of we have cookieParser!
    res.json({
        message: "user signout successfully"
    });
};

//protected routes

exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"  //userProperty uses req para and puts an id to the req
})


//custom middlewares 
exports.isAuthenticated = (req, res, next)=>{  //its custom one so need next()
    let checker = req.profile && req.auth && req.profile._id===req.auth._id;  //profile will be set from fontend
    if(!checker){
        return res.status(403).json({
            ERROR:"ACCESS DENIED!"
        })
        next();
    }
}

exports.isAdmin = (req, res, next)=>{ 
    if(req.profile.role===0){
        return res.status(403).json({
            ERROR:"Sorry, you are not ADMIN, Access denied!"
        })
    } 
    next();  //for revision,next responsible for transfereing the control from one middleware to another and from last middleware to sending response
    
};