var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//db config
mongoose.connect('mongodb://garylm:asdfg@ds263137.mlab.com:63137/shopping-app')

var Login = require('../model/logins');
var Product = require('../model/products');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/login')
 
 .post(function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
 
 Login.findOne({username: username, password: password},function(err, user) {
 if (err)
 res.send(err);
 console.log(user)
 if(user)
 {//responds with a json object of our database comments.
 res.json({ message: 'Login Successful' })
 }
 else{
    res.status(204);
    res.json({ message: 'Login Failed' })

 }
 });
 })




router.route('/products')
 
.get(function(req, res) {
 Product.find(function(err, products) {
 if (err)
 res.send(err);
 res.json(products)
 });
 })
 
 .post(function(req, res) {
 var product = new Product();

 product.name = req.body.name;
 product.description = req.body.description;
 product.price = req.body.price;
 product.variants = req.body.variants;
 product.imgPath = req.body.imgPath;
product.save(function(err) {
 if (err)
 res.send(err);
 res.json({ message: 'Product successfully added!' });
 });
 });

 router.route('/products/:product_id')
//The put method gives us the chance to update our product based on 
//the ID passed to the route
 .put(function(req, res) {
 Product.findById(req.params.product_id, function(err, product) {
 if (err)
 res.send(err);
 //setting the new name and description to whatever was changed. If 
//nothing was changed we will not alter the field.
 (req.body.name) ? product.name = req.body.name : null;
 (req.body.description) ? product.description = req.body.description : null;
 (req.body.price) ? product.price = req.body.price : null;
 (req.body.variants) ? product.variants = req.body.variants : null;
 (req.body.imgPath) ? product.imgPath = req.body.imgPath : null;
 //save product
 product.save(function(err) {
 if (err)
 res.send(err);
 res.json({ message: 'Product has been updated' });
 });
 });
 })
 //delete method for removing a product from our database
 .delete(function(req, res) {
 //selects the product by its ID, then removes it.
 Product.remove({ _id: req.params.product_id }, function(err, product) {
 if (err)
 res.send(err);
 res.json({ message: 'Product has been deleted' })
 })
 });

module.exports = router;
