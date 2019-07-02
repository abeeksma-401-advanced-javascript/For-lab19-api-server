'use strict';

const Q = require('@nmq/q');

const dbQ = new Q('database');

const Category = require('./categories-schema');

class Categories {

  get(_id) {
    //checks for a 24 character id containing 0-9 or a-z as characters (case insensitive)
    if(!/^[0-9a-z]{24}$/i.test(_id))
      return Promise.resolve(null);
    dbQ.publish('database', 'read', _id);
    return Category.findOne(_id);
  }

  getAll(){
    return Category.find();
  }
  
  post(record) {
    var category = new Category (record);
    dbQ.publish('database', 'create', category);
    return category.save();
  }

  //TODO: fix this mess
  async put(_id, record){
    let updatedCat = await Category.findOne({_id});
    Object.assign(updatedCat, record);
    dbQ.publish('database', 'update', updatedCat);
    await updatedCat.save();
  }
    
  //TODO: DESTROY!!!!  
  delete(_id) {
    dbQ.publish('database', 'delete', _id);
    Categories.deleteOne({_id});
  }

}

module.exports = Categories;
