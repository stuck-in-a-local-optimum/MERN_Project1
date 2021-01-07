const express = require('express')
const router = express.Router()  //need router which come up from express

const {getUserById, getUser}= require('../controllers/user.js')  //bring necessary stuffs from user controller
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication.js") //bring necessary stuffs from athentication controller


//below line of code will populate req.profile whenever there is 
// anything inside any route after colon":" it will treated as userId and the meothod 
//will populate req.profile object with user object
router.param("userId", getUserById);


router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);  //putting 'user' to all url //we used middlewares isSignedIn, isAuthenticated to run before getting the user

module.exports = router; //whatever comes up needs to be exported

