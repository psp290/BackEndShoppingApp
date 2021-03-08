const Cart = require('../models/cart');
const Product = require('../models/product');



//  updateItemQuantity by itemId

exports.updateItemQuantity = (req,res)=>{
    var id=req.body.userId;
    Cart.findOneAndUpdate({user_id:id,'cartItems._id':req.body.itemId},{
        
       $set:{ 'cartItems.$.quantity':req.body.quantity}
    
    },
    (err,result)=>{
        if(err) return res.json(err);
        console.log(result);
        return res.json({message:'Item updated'})
    })
};


// add item to cart

exports.addItemToCart = (req,res)=>{

    Cart.findOne({user_id:req.body.userId},(err,cart)=>{
        if(err) return res.json(err);

        if(cart){
            
            for(i=0;i<cart.cartItems.length;i++)
            {
                if(cart.cartItems[i].product==req.body.productId)
                {
                    return res.json({message:'item exist in cart go to cart'});
                }
                
            }

            cart.cartItems.push({product:req.body.productId});
            
            cart.save();

            return res.json({message:'Item is added'});
        }
        else
        {
            Cart.create({
                user_id:req.body.userId,
                cartItems:{product:req.body.productId}
            },(err)=>{
                if(err) return res.json(err);

                return res.json({message:'Cart is created'});

            })
        }
    });

}






// get cart details for user

exports.getCartDetails = (req,res)=>{
   
    var id = req.params.userId

    Cart.findOne({user_id:id})
        .populate('cartItems.product')
        .exec((err,result)=>{
            
            if(result==null)
            {
                return res.json({message:'noCart'})
            }
           return res.json(result);
        })
    
    
}


// Remove item from cart

exports.removeItem = (req,res)=>{
    var id=req.body.userId;
    Cart.findOneAndUpdate({user_id:id},
    {
        $pull: {
            cartItems: {
              product: req.body.productId,
            },
        },
    }
    ,(err)=>{
        if(err) res.json(err);
        res.json({message:'deleted'});
    })
};