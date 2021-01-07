const mongoose = require('mongoose')

//pull out the objectId and refer it to whatever schema we want(category schema linking)
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },

    description: {
        type: String,
        trim: true,
        required: true,
        maxLength: 2000

    },
     
    price:{
        type: Number,
        required: true,
        maxLenth:32,
        trim: true
    },

    category:{  //we want to create a linked category that we already have defined
        type: ObjectId,  //previously type used to string or numbere but now we will have it as OBjectid 'coz we are linking the schemas
        ref:"Category",  //that name which given to our in category file 'cause we want to link it with this schema
        required : true
    },

    stock:{
        type: Number
    },

    sold: {
        type: Number,
        default:0
    },
    photo:{ //one way to put photos
        data: Buffer,  //stored data in buffer
        contentType: String
    }
},

    { timestamps: true}  
    

);
module.exports = mongoose.model("Product", productSchema);
