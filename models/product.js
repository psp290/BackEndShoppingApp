const mongoose = require('mongoose');


var ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:true
    },
    price:{
        type:Number,
    },
    description:{
        type:String,
        trim:true
    },
    inStock:{
        type:Boolean,
        default:true
    },
    type:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Type'
    },
    rating:{
        type:Number
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Brand',
    },
    thumb:{
        type:String
    }

},{timestamps:true});



mongoose.model('Products',ProductSchema);
module.exports = mongoose.model('Products');