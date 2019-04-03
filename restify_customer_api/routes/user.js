const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../models/User');
const User = mongoose.model('User');
const auth = require('../helper/auth');
const jwt = require('jsonwebtoken');
const config  = require('../config');

module.exports = (server) => {
    server.get('/users', async (req, res, next) => {
        try{
            let users = await User.find({});
            res.send(200,users);
            next();
        }
        catch(err){
            res.send(404,'Document Not Found');
            next();
        } 
    });
    server.post('/register', async (req, res, next) =>{
        try{
            if(!req.is('application/json')){
                res.send(404,'Application type invalid');
                next();
            }
            let {username, email, password} = req.body;
            let existUser = await User.findOne({username});
            if(existUser){
                res.send(404, 'Usernane is exist');
                next();
            }
            user = new User({
                username,
                email,
                password
            });
            bcrypt.genSalt(10,(err, salt)=>{
                bcrypt.hash(user.password,salt, async (err,hash)=>{
                    user.password = hash;
                    try{
                        await user.save();
                        res.send(201, 'Registered');
                        next();
                    }
                    catch(err){ 
                        res.send(401);
                        next();
                    }
                })
            })
        }   
        catch(err){
            res.send(404, 'Create error');
            next();
        }
    });

    server.del('/users/:id', async (req, res, next) => {
        try{
            await User.findOneAndDelete({_id:req.params.id});
            res.send(201);
            next();
        }
        catch(err){
            res.send(400);
            next();
        }
    })

    server.post('/auth', async (req, res, next) => {
        const {username,password} = req.body;
        try{
            const user = await auth.authentication(username, password);
            let token = jwt.sign(user.toJSON(), config.JWT_SECRET,{
                expiresIn: '7m'
            });
            const result = jwt.decode(token);

            res.send({result, token});
            //res.send(200, 'Authenticated');
            next();
        }
        catch(err){
            res.send(404,'Authentication Failed');
            next();
        }
    })
}