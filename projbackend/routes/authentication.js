var express = require('express')
const { check, validationResult } = require('express-validator');
var router = express.Router()

// router.get("/signout", (req,res)=>{ //when someone wants to visit signout route then we want to run the authRoute(see in app.js)
//     res.send("user signout")
// })

//Above thing using json response 
// const signout = (req, res)=>{
//     res.json({   //throwing josn response
//         message: "user signout success"
//     });
// };

//we transfered above code in authentication.js in controller foldera and we will import again here by following way


 
const {signout, signup, signin, isSignedIn} = require("../controllers/authentication.js");  //go one folder back(..) and in controllers then in authentication.js and import signout method




//creating the signup route (POST one!)
router.post("/signup", 
        //check for fields that we want to validate!
        //same as putting a middleware
                    [
                        check("name").isLength({ min: 5 }).withMessage('name must be atleast 3 chars long'),
                        check("email").isEmail().withMessage("email is required!"),
                        check("password").isLength({min:8}).withMessage("password must be atleast 8 char long")
                    ],

         signup);

router.post("/signin",
    //array fields we want to validate
[
    check("email").isEmail().withMessage("email is required!"),
    check("password").isLength({min:8}).withMessage("password should be atleast 8 char long")
],
signin);  


router.get("/signout", signout);

router.get("/testRoute", isSignedIn,(req,res)=>{  ///isSignedIn as middleware  //not need to write "next" here because expressJwt already covered it for us
    res.json(req.auth); //we have used auth as userProperty and set it as req parameter (sort of)
});
module.exports = router;   //throw all things that we are creating in this file outside of this file
