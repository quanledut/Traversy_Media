const errors = require('restify-errors');
require('../models/Customer')
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

module.exports = server => {
    server.get('/customers', async (req, res, next) => 
        {
            try{
                let docs = await Customer.find({});
                res.status(200);
                res.json(docs);
            }
            catch(err){
                return next(new errors.NotFoundError());
            }
            next();
        }
    );
    server.post('/customers',async (req, res, next) => {
        try {
            if(!req.is('application/json')){
                return next(new errors.InvalidContentError());
            }
            const {name, email, balance} = req.body;
            let customer = new Customer({
                name,
                email,
                balance
            });
            let result = customer.save();
            // res.status(201);
            // res.json(result);
            res.send(201,'Created');
        }
        catch(err){
            return next(err);
        }
        next();
    });

    server.get('/customers/:id',async (req, res, next) => {
        try{
            let customer = await Customer.findById(req.params.id);
            res.send(customer);
        }   
        catch(error){
            return next(new errors.ResourceNotFoundError(`There is no customer with id ${req.params.id}`));
        }
        next();
    });

    server.put('/customers/:id', async (req, res, next) => {
        try{
            if(!req.is('application/json')){
                return next(new errors.InvalidContentError(`Invalid Content Error`))
            }
            customer = await Customer.findOneAndUpdate({_id:req.params.id},req.body);
            res.send(200,'Customer updated');
        }
        catch(err){
            return next(new errors.ResourceNotFoundError('Custonmer not update'));
        }
        next();
    });

    server.del('/customers/:id', async (req, res, next) => {
        try{
            const customer = await Customer.findOneAndRemove({_id:req.params.id});
            if(!customer){
                res.send(404);
                next();
            }
            res.send(204);
            next();
        }
        catch(err){
            return next(new errors.ResourceNotFoundError('Not found document'));
        }
    })
}