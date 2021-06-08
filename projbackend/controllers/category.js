
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

exports.createCategory = (req, res) => {
    const category = new Category(req.body);

    category.save( (err, category) =>{
        if(err || !category){
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        }
        res.json({ category});


    })


}


exports.getCategory = (req, res) =>{

    return res.json( req.category);   //this req.category is been populated by getCategoryById

};

exports.getAllCategory = (req, res) =>{
    Category.find().exec( (err, categories) =>{
        if(err || !categories){
            return res.status(400).json({
                error: "No categories found"
            })
        }
        res.json( categories)

    })

}