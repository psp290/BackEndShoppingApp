const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');


exports.placeOrder = (req,res)=>{

    Cart.findOneAndRemove({user_id:req.body.userId},(err,cart)=>{

        var t=req.body.items;
        
        console.log(Number(req.body.totalAmount));
        Order.create({
            user_id:req.body.userId,
            country:req.body.country,
            state:req.body.state,
            city:req.body.city,
            address:req.body.address,
            pinCode:req.body.pinCode,
            totalAmount:Number(req.body.totalAmount),
            items:t,

            
            orderDate:new Date()
        })

        if(err) return res.json({message:err});

        console.log('Order placed');
    })



}


exports.getOrderById = (req,res)=>{
    var id = req.params.orderId;
    Order.findOne({_id:id},(err,result)=>{
        if(err) res.json(err);

        console.log(result);
        res.json(result);
    })
    .populate('items.product');
}

exports.getAllOrders = (req,res)=>{
    var id = req.params.id;
    console.log('....<<<',id);
    Order.find({user_id:id},(err,result)=>{

        if(err) res.json(err);

        res.json(result);
    })
    .populate('item.product');
}

exports.adminOrders = (req,res)=>{
    var page = Number(req.query.orderPage || "0");

    condition = {"orderStatus.delivered":false}

    if(req.query.userId)
    {
        condition["user_id"]=req.query.userId;
        console.log(req.query.userId)
    }

    if(req.query.delivered)
    {
        condition["orderStatus.delivered"]=true
    }

            Order.find(condition,(err,result)=>{



                Order.countDocuments(condition,(err,count)=>{

                var page_array = [];

                for(var i=0;i<Math.ceil(count/3);i++)
                {
                    page_array.push(i+1);
                }

                if(err) return res.json(err);
                return res.json({
                    current_page:Number(page)+1,
                    data:result,
                    page_array:page_array
                });


                })

            }).limit(3).skip(3*Number(page)).sort({orderDate:-1});
        
}






exports.orderPacked = (req,res)=>{

    Order.findOneAndUpdate({_id:req.params.id},
        {
            $set:{
                'orderStatus.packed':true
            }
        },(err)=>{
            if(err) res.json(err);

            res.json('Order Packed');
        })
}



exports.orderShipped = (req,res)=>{

    Order.findOneAndUpdate({_id:req.params.id},
        {
            $set:{
                'orderStatus.shipped':true
            }
        },(err)=>{
            if(err) res.json(err);

            res.json('Order Shipped');
        })
}


exports.orderDelivered = (req,res)=>{

    Order.findOneAndUpdate({_id:req.params.id},
        {
            $set:{
                'orderStatus.delivered':true
            }
        },(err)=>{
            if(err) res.json(err);

            res.json('Order delivered');
        })
}