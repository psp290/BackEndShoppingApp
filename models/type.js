const mongoose = require('mongoose');

var TypeSchema = new mongoose.Schema({
    name:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    thumb:{
        type:String
    }
},{timestamps:true});

mongoose.model('Type',TypeSchema);
module.exports = mongoose.model('Type');