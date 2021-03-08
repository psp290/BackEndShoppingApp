const mongoose = require('mongoose');

var BrandSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    description:{
        type:String,
        trim:true
    },
    thumb:{
        type:String
    }


},{timestamps:true});

mongoose.model('Brand',BrandSchema);
module.exports = mongoose.model('Brand');