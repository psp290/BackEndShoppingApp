const jwt = require('jsonwebtoken');
const {secret, client_id, client_secret} = require('../extrasF/config')
const bcrypt = require('bcrypt');
const { salt } = require('../extrasF/config');
const User = require('../models/user');
const superagent = require('superagent');
const request = require('request');


// login with git


exports.loginWithGit = (req,res)=>{
    console.log('>>>>',req.body);
    const code = req.body.code;

    if(!code)
    {
        res.send({
            success:false,
            message:'code not found'
        })
    }

    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_secret:client_secret,
            client_id:client_id,
            code:code
        })
        .set('Accept','application/json')
        .end((err,result)=>{
            if(err) throw err;
            var acctoken = result.body.access_token
            console.log(result);
            const option ={
                url:'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':'token '+ acctoken,
                    'User-Agent':'mycone'
                }
            }
            var output ;
            request(option,(err,response,body)=>{
                output=body;
                console.log(body);
                return res.send(output);
            })
        })
}






// create user

exports.createUser = (req,res,next)=>{
    var hashpassword = bcrypt.hashSync(req.body.password,salt);

    User.create({
        username:req.body.username,
        phone:req.body.phone,
        email:req.body.email,
        password:hashpassword,
        isActive:true,
        role:req.body.role
    },(err,result)=>{
        

        
        if(err){
           return res.json({success:false,message:'duplicate'})
        }

        res.json({success:true});
    });


}


// get user information

exports.getUserInfo = (req,res)=>{
    var token = req.headers['x-access-token'];
    if(!token) return res.json({auth:false,token:"No Token Provided"});
    jwt.verify(token,secret,(err,data)=>{

        console.log({_id:data.id});
        if(err) return res.json({auth:false,token:"Invalid Token Provided"})
        User.findById(data.id,{password:0},(err,result) => {
            return res.json(result);
        })
    })
}


// login user

exports.userLogin = (req,res)=>{
    User.findOne({email:req.body.email},
        (err,data)=>{
            if(err) return res.json(err);
            if(!data) return res.json({message:'No User Found Register first'});
            else{
                const passIsValid = bcrypt.compareSync(req.body.password,data.password);
                if(!passIsValid) return res.json({message:'Wrong password'});

                var token = jwt.sign({id:data._id},secret,{expiresIn:"1d"});
                return res.json({auth:true,token:token});
                
            }

            
        })
}


// deactivate user


exports.deactivateUser = (req,res)=>{
    
    User.findOneAndUpdate({_id:req.body._id},
        {
            $set:{
                isActive:false
            }
        },(err,result)=>{
            
            res.json({message:'User Deactivated'});
        })
}




// activate User


exports.activateUser = (req,res)=>{
    
    User.findOne({email:req.body.email},(err,result)=>{
        if(err) throw err;

        if(!result) res.json({message:'Invalid email'});

        var passIsValid = bcrypt.compareSync(req.body.password,result.password);

        if(!passIsValid) res.json({'message':'Invalid password'});

        User.findByIdAndUpdate({_id:result._id},
            {
                $set:{
                    isActive:true
                }
            },
            (err,uni)=>{
                res.json({'message':'User Activated'});
            }
        );
    });
}


// delete user 

exports.deleteUser = (req,res)=>{
    var id = req.body._id;

    User.findByIdAndRemove({_id:id},(err,result)=>{
        if(err) res.json(err);
        res.send('User is deleted');
    });
}