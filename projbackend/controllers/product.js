const { json } = require("body-parser");
const Product = require("../models/product")


const formidable = require("formidable")
const _ = require("lodash")   // this '_' is for private stuffs in javaScript
const fs = require("fs");  //fs (filesystem) allows us to work with the file system on our local pc, it comes by default with  node js so not need to install 
const { purge } = require("../routes/authentication");
const { sortBy } = require("lodash");





// exports.getProductById = (req, res, next, id) =>{

//     Product.findById(id).exec( (err, product) =>{
//         if(err || !product){
//             return res.status(400).json({
//                 error: "product not found in DB"
//             })
//         }
//         req.product = product;
//         next();
//     })
// }

//---if we want to populate product based on category so our getProductById will be like this
exports.getProductById = (req, res, next, id) =>{

    Product.findById(id)
    .populate("category")   
    .exec( (err, product) =>{
        if(err || !product){
            return res.status(400).json({
                error: "product not found in DB"
            })
        }
        req.product = product;
        next();
    })
}

exports.createProduct = (req, res) => {
    //creation of form
    let form = new formidable.IncomingForm();  //form object  //it expects 3 parameters > err, fields, files
    form.keepExtensions = true; //to keep the extension of the uploads (.pdf, .mp4 , etc)

    //parse the form
    form.parse( req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "problem with image"
            })
        }


        //destructuring the fields (so far we are getting everything like fields.price, etc 
        //so we will destructure them so that no need to use them by field.price everytime)
        const {name, description, price, category, stock} = fields;

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
             

        ){
            return res.status(400).json({
                error: "All fields are mandatory, please include all of them"
            })
        }






        //TODO restriction on fields

        let product = new Product(fields)  //product is created based on fields
        

        //handle file here
        if(file.photo){  //check in product model, we have image of product as 'photo'
            if(file.photo.size > 3000000){  //we won't allow image size greater than 3MB
                return res.status(400).json( {
                    error: "File size too big!"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path)  //grab the path of the photo which was given by formidable
            product.photo.contentType = file.photo.type

        }

        //save to the DB
        product.save( (err, product) => {
            if(err){
                res.status(400).json({
                    error: "Saving tShirt in DB failed"
                });
            }
            res.json(product)
        });
});

};


exports.getProduct = (req, res) => {

    req.product.photo = undefined;   //photo is bulky so made it undefined to make the app fast
    return res.json(req.product)  //it is populated by getProductById middleware
}


//middleware that will load the photo in background which will make our application fast
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)  
        return res.send( req.product.photo.data)
    }
    next();
}



exports.deleteProduct = (req, res) =>{
    let product = req.product;  //grab the product

    product.remove( (err, deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete the product"
            })
        }

        res.json({
            message: "Deletion was a success", 
            deletedProduct  
        })
    })

}

exports.updateProduct = (req, res) =>{

        //creation of form
        let form = new formidable.IncomingForm();  //form object  //it expects 3 parameters > err, fields, files
        form.keepExtensions = true; //to keep the extension of the uploads (.pdf, .mp4 , etc)
    
        //parse the form
        form.parse( req, (err, fields, file) => {
            if(err){
                return res.status(400).json({
                    error: "problem with image"
                })
            }
    
    
            //updation code
            let product = req.product;  //we need to update this
            product = _.extend(product, fields)
    
            //handle file here
            if(file.photo){  //check in product model, we have image of product as 'photo'
                if(file.photo.size > 3000000){  //we won't allow image size greater than 3MB
                    return res.status(400).json( {
                        error: "File size too big!"
                    })
                }
    
                product.photo.data = fs.readFileSync(file.photo.path)  //grab the path of the photo which was given by formidable
                product.photo.contentType = file.photo.type
    
            }
    
            //save to the DB
            product.save( (err, product) => {
                if(err){
                    res.status(400).json({
                        error: "updation of product is failed"
                    });
                }
                res.json(product)
            });
    });
    
    };



    //product listing
    exports.getAllProducts = (req, res) => {

        let limit = req.query.limit ? parseInt(req.query.limit) : 8;  //if a query by user have 'limit' than use that value as limit otherwise default value 8
        let sortBy = req.query.sortBy ? req.query.sortBy : "_id";   //same as above 
        Product.find()
        .select("-photo")   //don't select photo (-)
        .populate("category")   //populate the category
        .sort( [[sortBy, "asc"]])
        .limit(limit)   //only this no. of products show
        .exec( (err, products) =>{
            return res.status(400).json({
                error: "No product found"
            })
        })

        res.json(products)
    }
    
    