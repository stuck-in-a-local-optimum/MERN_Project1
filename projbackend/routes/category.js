const express = require("express")
const router = express.Router()

const {getCategoryById} = require("../controllers/category.js")
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/authentication.js")
const {getUserById} = require("../controllers/user.js")


router.param("userId", getUserById);  //req.profil will be populated by user which have id 'userId'
router.param("categoryId", getCategoryById);


module.exports = router;