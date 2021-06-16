const express = require("express");
const router = express.Router();


const {getProductById, createProduct, getProduct, photo,deleteProduct,  updateProduct, getAllProducts} = require("../controllers/product.js")
const {isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication.js")
const {getUserById} = require("../controllers/user.js");
const { route } = require("./authentication.js");
const product = require("../models/product.js");





//params
router.param("userId", getUserById)
router.param("productId", getProductById);


//all of actual routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);



//read routes
//route to get one product 
router.get("/product/:produtId", getProduct);
router.get("/product/photo/:productId", photo)  //optimization


//delete routes
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)


//update routes
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct )


//listing routes
router.get("/products", getAllProducts);   //no need the user to be signedIn




module.exports = router;






