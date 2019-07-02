'use strict';

const express = require('express');
const prodRouter = express.Router();

const Products = require('../models/products');
const products = new Products();

const auth = require('../auth/middleware')


prodRouter.get('/products', auth(), getProducts);
prodRouter.post('/products', auth(), postProducts);
prodRouter.get('/products/:id', auth(), getProduct);
prodRouter.put('/products/:id', auth(), putProducts);
prodRouter.delete('/products/:id', auth(), deleteProducts);


function getProducts(request,response,next) {
  // expects an array of objects back
  products.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function getProduct(request,response,next) {
  // expects an array with one object in it
  products.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function postProducts(request,response,next) {
  // expects the record that was just added to the database
  products.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function putProducts(request,response,next) {
  // expects the record that was just updated in the database
  products.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function deleteProducts(request,response,next) {
  // Expects no return value (the resource should be gone)
  products.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}



module.exports = prodRouter;