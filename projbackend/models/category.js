const mongooose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxLength: 32,
        unique:true
    }
},
{ timestamps: true} //whenever we make new entry to schema it will store the exact time in the database
);


module.exports = mongooose.model("Category", categorySchema)