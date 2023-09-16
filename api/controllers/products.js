const mongoose = require('mongoose');
const Product = require('../models/product'); 

exports.get_all = (req, res, next)=>{
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            products: docs.map(doc=>{
                return{
                    name:doc.name,
                    price:doc.price,
                    productImage: doc.productImage,
                    _id:doc._id,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/products/'+ doc._id
                    }
                }
            })
        };
        //if(docs >= 0){
        res.status(200).json(response);
        //} else{
        //    res.status(404).json({
        //    message: 'No product found'
        //  });
        // }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.create = (req, res, next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
    .save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Created product successfully',
            createdProduct: {
                name: result.name,
                price:result.price,
                _id:result._id,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/products/'+ result._id
                }
            }
        });
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.get_product_by_id = (req, res, next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then(doc =>{
        if(doc){
            res.status(200).json({
                product:doc,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/products/'+ doc._id
                }
            });
        } else{
            res.status(404).json({message: 'No valid entry found for ID'});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
};

exports.update = (req, res, next)=>{
    const id= req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Product.findByIdAndUpdate({_id: id}, { $set: updateOps})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'Product Updated',
            request:{
                type: 'GET',
                url: 'http://localhost:3000/products/'+ result._id
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.delete = (req, res, next)=>{
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted succesfully',
            request:{
                type: 'GET',
                url: 'http://localhost:3000/products'
            }
        });
    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
};