const express = require("express");
const router = express.Router();


const {getProductById, createProduct} = require("../controllers/product.js")
const {isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication.js")
const {getUserById} = require("../controllers/user.js")





//params
router.param("userId", getUserById)
router.param("productId", getProductById);


//all of actual routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);



module.exports = router;






