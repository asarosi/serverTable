(function () {
  'use strict';

  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({'extended': 'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));
  app.use(express.static(__dirname + '/../../client'));
  //app.use('/bower_components', express.static(__dirname + '/../bower_components'));

  require('./database/database.js');

  var server = app.listen(3000, function () {

    var port = server.address().port;

    console.log('Template server listening at http://%s:%s', 'localhost', port);
  });

  var mongoose = require('mongoose');
  var userModel = mongoose.model(global.USER_SCHEMA_NAME);

  // TODO [sarpad] finish the query
  app.get('/count', function (req, res) {

    var year = Number(req.query.year);
    var month = Number(req.query.month);
    var searchText = req.query.searchText;

    var query = {};

    if (year) {
      query.birthYear = year;
    }

    if (month) {
      query.birthMonth = month;
    }

    userModel.count(query, function (error, count) {
      res.status(200).send({numberOfRows: count});
    });
  });

  // TODO [sarpad] finish the query
  app.get('/list', function (req, res) {

    var limit = Number(req.query.itemsByPage);
    var year = Number(req.query.year);
    var month = Number(req.query.month);
    var searchText = req.query.searchText;

    var skipAndLimit = {};

    if (limit) {
      var skip = Number(req.query.currentPage) * limit;
      skipAndLimit = {
        skip: skip,
        limit: limit
      }
    }

    var query = {};

    if (year) {
      query.birthYear = year;
    }

    if (month) {
      query.birthMonth = month;
    }

    userModel.find(query, '', skipAndLimit, function (error, users) {
      res.status(200).send(users);
    });

  });

})();
