
const express = require('express');
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication.js")
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user.js");
const {updateProduct} = require("../controllers/product.js");

const {getOrderById} = require("../controllers/order.js")


//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);



module.exports = router;