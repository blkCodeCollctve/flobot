'use strict';

var _mongodb = require('mongodb');

var _constants = require('./constants');

_mongodb.MongoClient.connect(_constants.DB_CONNECTION, { useNewUrlParser: true }, function (err, client) {
  if (err) {
    console.log('ERROR: can\'t connect to db: ' + err);
    return;
  }

  var db = client.db(_constants.DB_NAME);
  var collection = db.collection('lastQuery');

  collection.findOne({}, function (err, document) {
    if (err) {
      console.log('ERROR: can\'t find \'lastQuery\' document: ' + err);
      return;
    }

    console.log('last queried ' + document.date);

    // TODO: Add worker logic here

    var newLastQueryDate = new Date().toString();
    collection.updateOne({}, { $set: { date: newLastQueryDate } }, function (err, doc) {
      if (err) {
        console.log('ERROR: can\'t update \'lastQuery\' document: ' + err);
        return;
      }
      console.log('last query date set to ' + newLastQueryDate);
      client.close();
    });
  });
});