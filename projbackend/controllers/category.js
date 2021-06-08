
const Category = require("../models/category");    //Category model imported   


exports.getCategoryById  = (req, res, next, id) =>{

    Category.findById(id).exec( (err, category) =>{
        if(err || !cate){
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }

        req.Category = category;
        next();
    });
};