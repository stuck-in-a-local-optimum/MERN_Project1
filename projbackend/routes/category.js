const express = require("express")
const router = express.Router()

const {getCategoryById, createCategory} = require("../controllers/category.js")
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication.js")
const {getUserById} = require("../controllers/user.js")



//params
router.param("userId", getUserById);  //req.profil will be populated by user which have id 'userId'
router.param("categoryId", getCategoryById);


//actual routers goes here 

//create route
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)   //all the category routes will have 'category' as prefix and hence the actual route will be like 'localhost:800/api/category/routeName'

module.exports = router;