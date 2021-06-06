const User = require('../models/user');  //user model imported

const Order = require("../models/order.js")


exports.getUserById = (req, res, next, id)=>{  //as middleware //it works with params and can find info based on 'id'
    /*------- exec method----
    Executes a search on a string using a regular expression 
    pattern, 
    and returns an array containing the results of that search.
    */
    User.findById(id).exec((ERROR, user)=>{

        if(ERROR || !user){
            return res.status(400).json({
                ERROR: "No user found in DB"
            });
            }
        //if user found
        req.profile = user;  //profile can also e named as user but it get confusing here
        next();    //next is at correct place xD


    });

};

exports.getUser = (req, res)=>{
    req.profile.salt = undefined;  //this will make it undefined to not show to frontend client side, it won't affect them in backend
    req.profile.encry_password = undefined;
    return res.json(req.profile);  //req.profile has been populated by above findById middleware
};

exports.updateUser = (req, res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},  //this _id is will be populated by getUserId middleware because we are using userId and hence will automatically get called
        {$set: req.body}, //we want update everything in req.body
        {new : true, useFindAndModify: false}, //necessary to have it

        (err, user)=>{
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                })
            }

            user.salt= undefined;
            user.encry_password = undefined;
            res.json(user);  //if not err
        }
    )
}


exports.userPurchaseList = (req, res)=>{
    Order.find( {user : req.profile._id})   //find based on _id that has been populated by middleware getByUserID
    .populate("user", "_id name")
    .exec( (err, order) => {
        if(err) {
            return res.status(400).json({
                error: "No Order in this acount"
            });



        }
        return res.json(order);

    });

};

exports.pushOrderInPurchaseList = (req, res, next) =>{
    //declare a local purchases array
        let purchases = [];  //this all things will be recieved by frontend, we leave it as of now
        req.body.products.forEach( product => {
            purchases.push({   //in the purchases array, we push object ( -->{ })
                _id : product._id,
                name: product.name,
                description : product.description,
                category: product.category,
                quantity : product.quantity,
                amount : req.body.order.amount,
                transactionId : req.body.order.transactionId
            })

        })


        //STORE THIS IN DB
        User.findOneAndUpdate(     //findOneAndUpdate because we will find the user based on id and will push in its purchases array
                { _id : req.profile._id},
                //push not set 'cause we are adding in our array
                {$push : {purchases : purchases}},    //update  user's purcheses array with local purchases array
                {new: true} ,  //whenever we get object/error from DB, this ensures we get updated objected

                (err, purchases ) => {
                    if(err){
                        return res.status(400).json({
                            error: "Unable to save purchase list"
                        });
                    }
                    next()   //we putted next here not below because if no error then handover the control to someone else
                }
        )
        //next()
}


//BELOW WAS JUST AN ASSIGNMENT
// exports.getAllUsers = (req, res)=>{
//     User.find().exec((err, users)=>{
//         if(err || !users){
//             return res.status(400).json({
//                 error: "NO users found"
//             });
//         }
//         res.json(users);

//     });
// }