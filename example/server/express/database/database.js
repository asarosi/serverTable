var mongoose = require('mongoose');

global.DATABASE_ADDRESS = 'mongodb://localhost/expressExample';
global.USER_SCHEMA_NAME = 'user';

mongoose.connect(global.DATABASE_ADDRESS);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + global.DATABASE_ADDRESS);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

require('./user.schema.js');
require('./user.init.js')();
