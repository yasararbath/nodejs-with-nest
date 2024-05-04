
const express = require('express');
const router = express.Router();
const Users = require('../models/userModel');
const { mongoose } = require('mongoose');

router.get('/all-users', async (req,res)=>{
    try{
        const User = await Users.find();
        res.send(User);
    }catch(err){
        console.log('err', err);
    }
});

router.get('/user/:id', async (req,res)=>{
    try{
        const User = await Users.find({_id: req.params.id});
        res.send({user:User});
    }catch(err){
        console.log('err', err);
    }
});

router.post('/user', async (req,res)=>{
    try{
        const UserModel = new Users({
            "createdAt": new Date(),
            "firstName": req.body.firstName,
            "password": req.body.password,
            "email": req.body.email,
            "updatedAt": new Date(),
            "lastName": req.body.lastName
          });
        await UserModel.save();
        res.send({user : UserModel});
    }catch(err){
        console.log('err', err);
    }
    
});

router.put('/user/:id', async (req,res)=>{
    try{
        let User = await Users.findOne({_id: req.params.id});
        Object.keys(req.body).forEach((key=>{
            User[key]= req.body[key]
        }))
         await User.save();
            res.send({user: User});
    }catch(err){
        console.log('err', err);
    }
});

router.delete('/user/:id', async (req,res)=>{
    try{
    await Users.deleteOne({_id: req.params.id});
        res.send();
    }catch(err){
        console.log('err', err);
    }
});
module.exports = router