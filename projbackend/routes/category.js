const express = require("express")
const router = express.Router()

const {getCategoryById, createCategory,getCategory,  getAllCategory, updateCategory, removeCategory} = require("../controllers/category.js")
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication.js")
const {getUserById} = require("../controllers/user.js")



//params
router.param("userId", getUserById);  //req.profil will be populated by user which have id 'userId'
router.param("categoryId", getCategoryById);


//actual routers goes here 

//create routes
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)   //all the category routes will have 'category' as prefix and hence the actual route will be like 'localhost:800/api/category/routeName'

//route to get a category from unique id
//read route
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update routes
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);


//delete route
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);


module.exports = router;