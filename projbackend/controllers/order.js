
const {ProductCart, Order} = require("../models/order.js")


//params
exports.getOrderById = (req, res, next, id) =>{
    Order.findById(id)
    .populate("products.product", "name price")   //products.product(front end thing), and there should not be comma b/w name price that we want to populate
    .exec( (err, order) =>{
        if(err){
            return res.status(400).json({
                error:"No order found in DB"
            })
        }
        req.order = order;
        next();
    });
};



exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;  //becauase order schema is assaciated with a user also
    const order = new Order(req.body.order);
    order.save( (err, order) => {
        if(err){
            re
        }
    }) 
}