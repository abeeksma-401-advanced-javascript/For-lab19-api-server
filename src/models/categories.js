'use strict';

const Category = require('./categories-schema');

class Categories {

  get(_id) {
//checks for a 24 character id containing 0-9 or a-z as characters (case insensitive)
    if(!/^[0-9a-z]{24}$/i.test(_id))
      return Promise.resolve(null)

    return Category.findOne(_id);
  }

  getAll(){
    return Category.find();
  }
  
  post(record) {
    var category = new Category (record);
    return category.save();
  }

  //TODO: fix this mess
  async put(_id, record){
    let updatedCat = await Category.findOne({_id});
    Object.assign(updatedCat, entry);
    await updatedCat.save();
  }
    
  //TODO: DESTROY!!!!  
  delete(_id) {
    Cateogory.deleteOne({_id})
  }

}

module.exports = Categories;
