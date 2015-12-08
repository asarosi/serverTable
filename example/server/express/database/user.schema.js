var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  birthYear: Number,
  birthMonth: Number,
  birthPlace: String

}, {collection: global.USER_SCHEMA_NAME});

mongoose.model(global.USER_SCHEMA_NAME, userSchema);

