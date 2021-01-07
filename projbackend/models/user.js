var mongoose = require("mongoose");

const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true    
    },

    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique:true
    },

    userinfo: {
        type: String,
        trim: true
    },

    
    encry_password: {
        type: String,
        required:true
    },

    salt: String,  //will be used for password
    
    role: {
        type: Number,
        default: 0
    },

    purchases : {
        type: Array,
        default: []
    }    

},
{ timestamps: true} 
);

userSchema.virtual("password")  //virtual name is 'password'
    .set(function(password){  //password as parameteer
        this._password = password  //by '_' we made the variable private and we saved it to another variable to refer it later on
        this.salt = uuidv1();  //generates some long random string
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;  //returns the virtual field created!
    })

userSchema.method={

    authenticate: function(plainPassword){
        return this.securePassword(plainPassword)===this.encry_password
    },

//this method will convert the plainPassword into a secure password
    securePassword : function(plainPassword){  //we encryted this plainPassword to a secure one
        if(!plainPassword) return "";  //since type of password is String in our schema so we need to return  a string
        try{
            return crypto.createHmac('sha256',this.salt)
            .update(plainPassword)
            .digest('hex')
        } catch(ERROR){
            return "";
        }

    }
}

//we have just created above schema and to use it we need to throw out this user model from this file by exporting it
module.exports = mongoose.model("User", userSchema); //1st paramtr is name that we want to give to our schema and 2nd paramtr accepts actual schema

