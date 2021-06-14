const { json } = require("body-parser");
const Product = require("../models/product")


const formidable = require("formidable")
const _ = require("lodash")   // this '_' is for private stuffs in javaScript
const fs = require("fs")  //fs (filesystem) allows us to work with the file system on our local pc, it comes by default with  node js so not need to install 





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

        //TODO restriction on fields

        let product = new Product(fields)  //product is created based on fields
        

        //handle file here
        if(file.photo){  //check in product model, we have image of product as 'photo'
            if(file.photo.size > 300000){  //we won't allow image size greater than 3MB
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


}

