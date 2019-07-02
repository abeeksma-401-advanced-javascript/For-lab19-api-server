'use strict';

const uuid = require('uuid/v4');
const Product = require('./products-schema');

class Products {

  get(_id) {
    if(!/^[0-9a-z]{24}$/i.test(_id)){
    return Promise.resolve(null)
    }
    return Category.findOne(_id);
  }
  
  post(entry) {
    var product = new Product (entry);
    console.log(`this is the newly posted Product ${product}`)
    return product.save();
  }

  async put(_id, entry) {
    let updatedProd = await product.findOne({_id});
    Object.assign(updatedProd, entry);
    await updatedProd.save();
  }

  delete(_id) {
  }

  //TODO: figure out WTF this is
  sanitize(entry) {
  }

}

module.exports = Products;
