
const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;

//Multiple schemas in one file


//when the product is in cart it has some other properties like quanity, so we need a new schema for it
const ProductCartSchema = new mongoose.Schema({  
    product :{
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});


const ProductCart = mongoose.model("ProductCart", ProductCartSchema);
const orderSchema = new mongoose.Schema(
    {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {type: Number},
    address: String,
    status:{
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    updated: Date,
    user: { 
        type:ObjectId,
        ref: "User",   //same way that we did in category file  //this user will be populated by populate method in mongoose
    }
},

{timestamps: true}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = {ProductCart, Order};
