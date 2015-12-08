var mongoose = require('mongoose');
var userModel = mongoose.model(global.USER_SCHEMA_NAME);

module.exports = function () {

  var users = [
    {
      name: 'admin user',
      email: 'admin@email.com',
      birthYear: 2015,
      birthMonth: 1,
      birthPlace: 'admin place'
    },
    {
      name: 'test user',
      email: 'test.user@email.com',
      birthYear: 2011,
      birthMonth: 12,
      birthPlace: 'test place'
    },
    {
      name: 'dummy user',
      email: 'dummy@email.com',
      birthYear: 2005,
      birthMonth: 3,
      birthPlace: 'dummy place'
    },
    {
      name: 'example user',
      email: 'example@email.com',
      birthYear: 2013,
      birthMonth: 11,
      birthPlace: 'example place'
    },
    {
      name: 'custom user',
      email: 'custom@email.com',
      birthYear: 2015,
      birthMonth: 2,
      birthPlace: 'custom place'
    },
    {
      name: 'nice user',
      email: 'nice@email.com',
      birthYear: 2015,
      birthMonth: 5,
      birthPlace: 'nice place'
    },
    {
      name: 'bad user',
      email: 'bad@email.com',
      birthYear: 2015,
      birthMonth: 1,
      birthPlace: 'bad place'
    },
    {
      name: 'smart user',
      email: 'smart@email.com',
      birthYear: 2002,
      birthMonth: 7,
      birthPlace: 'smart place'
    },
    {
      name: 'ugly user',
      email: 'ugly@email.com',
      birthYear: 2015,
      birthMonth: 10,
      birthPlace: 'ugly place'
    },
    {
      name: 'strong user',
      email: 'strong@email.com',
      birthYear: 2005,
      birthMonth: 3,
      birthPlace: 'strong place'
    },
    {
      name: 'tiny user',
      email: 'tiny@email.com',
      birthYear: 2000,
      birthMonth: 4,
      birthPlace: 'tiny place'
    },
    {
      name: 'dark user',
      email: 'dark@email.com',
      birthYear: 2015,
      birthMonth: 2,
      birthPlace: 'dark place'
    }
  ];

  for (var i = 0; i < users.length; i++) {
    var user = new userModel({
      name: users[i].name,
      email: users[i].email,
      birthYear: users[i].birthYear,
      birthMonth: users[i].birthMonth,
      birthPlace: users[i].birthPlace
    });
    user.save();
  }

};