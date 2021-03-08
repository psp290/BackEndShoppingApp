
const mongoose = require('mongoose');
const product = require('./product');

var orderSchema = new mongoose.Schema({
    user_id:{
        type: String
    },
    address:{
        type:String
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    pinCode:{
        type:String
    },


    totalAmount:{
        type:Number
    },
    items:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Products' 
            },
            quantity: {
              type: Number,
            },
        }
    ],

    

    orderStatus:{
        ordered:{type:Boolean,default:true},
        packed:{type:Boolean,default:false},
        shipped:{type:Boolean,default:false},
        delivered:{type:Boolean,default:false}
    },

    orderDate:{
        type:String
    }




});


mongoose.model('Orders',orderSchema);

module.exports = mongoose.model('Orders');