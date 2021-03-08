const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    phone:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    avatar_url:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:'User'
    }

});

mongoose.model('User',UserSchema);

module.exports = mongoose.model('User');