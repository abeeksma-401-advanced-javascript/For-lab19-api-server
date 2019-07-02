'use strict'; 

const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
};

const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb://localhost/lab15apibuild';
  
const Categories = require('../../src/models/categories')


describe('Categories Repository', () => {
  beforeAll(() => {
    return mongoose.connect(MONGODB_URI, mongooseOptions);
  });

  it('can create a category and then get the category', async () => {
    let testCat = new Categories();
    let result = await testCat.post({name:'Items', description:'It holds Items'});
    
    expect(result).toBeDefined();
    expect(result.name).toBe('Items');
    expect(result._id).toBeDefined();
    expect(result._id.toString()).toEqual(result._id.toString());

    let resultFromDb = await testCat.get(result._id);
    expect(resultFromDb).toBeDefined();
    expect(resultFromDb.name).toBe('Items');
    expect(resultFromDb._id).toBeDefined();
    expect(resultFromDb._id.toString()).toEqual(resultFromDb._id.toString());
  });


  // it('should update a new category', async () => {
  //   let modified = await catRepository.put()

  //   expect(modified.name).toEqual('changed')
  // });


});