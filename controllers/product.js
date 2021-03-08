var Product = require('../models/product');
var Type = require('../models/type');
var Brand = require('../models/brand');
const { json } = require('body-parser');
const type = require('../models/type');

const mongoose = require('mongoose');


exports.getProducts = (req,res)=>{
    
    //req.query.name.replace(/%20/," ");
    
    // Cancel sort as per rating

    let condition = {inStock:true};
    
    let sortcondition={};

    if(req.query.inStock)
    {
        condition = {inStock:false}
    }
    
    if(req.query.typeId){
        condition["type"]=req.query.typeId;
    }

    if(req.query.brandId){
        condition["brand"]=req.query.brandId;
    }

    if(req.query.lcost && req.query.hcost)
    {
        condition["price"]={$lt:Number(req.query.hcost),$gt:Number(req.query.lcost)}
    }

    if(req.query.sort)
    {
        sortcondition["price"]=Number(req.query.sort);
    }

    if(req.query.rating)
    {
        condition["rating"]={$lt:Number(req.query.rating),
                            $gt:Number(req.query.rating)-1}
    }



    var page = Number(req.query.page|| "0");
    
    


    

        const Page_Size = 3;
    
        Product.find(condition)
        .populate('type')
        .populate('brand')
        .sort(sortcondition)
        .limit(Page_Size)
        .skip(Page_Size*page)
        .exec((err,result)=>{
            

            if(err)res.json({err});
            

            Product.countDocuments(condition,(err,count)=>{

                var page_array = [];

                for(var i=0;i<Math.ceil(count/Page_Size);i++)
                {
                    page_array.push(i+1);
                }

                console.log( {
                    condition:condition,
                    page_array:page_array
                });

                res.json({
                    current_page:Number(page)+1,
                    page_array:page_array,
                    data:result
                });

            })
            
        });
    

    

    
    
};


exports.getProductsName = (req,res)=>{
    Product.find((err,result)=>{
        if(err) res.json({message:err})

        res.json(result);
    })
        
}






exports.getProductById = (req,res) =>{
    Product.findOne({_id:req.params.id},(err,result)=>{
        if(err) throw err;

        res.json(result);
    })
    .populate('type')
    .populate('brand')
}

exports.updateProduct = (req,res)=>{
    var id = req.body._id;
    Product.findByIdAndUpdate({_id:id},
        {
            $set:{
                name:req.body.name,
                price:req.body.price,
                description:req.body.description,
                
                
                type:req.body.type,
                rating:req.body.rating,
                brand:req.body.brand,
                thumb:req.body.thumb
            }
        }
        ,(err,result) => {
            if(err) throw err;
            res.status(200).json({message:'Data Updated'})
        })
}





exports.newProduct = (req,res)=>{
    

    

    Product.create(req.body,
    (err,user) => {
            if(err) return res.json({message:'exists'});

            res.status(200).json(user);
        }
    );
};


exports.deleteStock = (req,res) => {
    var id = req.params.id
    Product.findByIdAndUpdate(
        {_id:id},
        {
            $set:{
                inStock:false
            }
        },(err,result) => {
            if(err) throw err;
            res.status(200).send('Data Updated')
        }
    )
}



exports.addInStock = (req,res) => {
    var id = req.params.id
    Product.findByIdAndUpdate(
        {_id:id},
        {
            $set:{
                inStock:true
            }
        },(err,result) => {
            if(err) throw err;
            console.log(result);
            res.status(200).json({message:'moveToStock'})
        }
    )
}


exports.removeProduct = (req,res)=>{
    var id = req.params.id;
    Product.findByIdAndRemove({_id:id},(err,result)=>{
        if(err) throw err;

        res.send('Remove product');
    })
}