'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
};

const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb://localhost/lab15apibuild';

mongoose.connect(MONGODB_URI, mongooseOptions);

require('./src/app.js').start(process.env.PORT || 3000);
