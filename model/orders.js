
//model/orders.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var variantsSchema = new Schema({
    variations: String,
    inventory: Number
  });
  
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var OrdersSchema = new Schema({
 name: String,
 totalCost: Number,
 customer_id: Number,
 variants: [variantsSchema]
});
//export our module to use in server.js
module.exports = mongoose.model('Orders', OrdersSchema);
