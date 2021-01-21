const User = require('../models/user');  //user model imported


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
    //TODO: get back here for password
    return res.json(req.profile);  //req.profile has been populated by above findById middleware
};