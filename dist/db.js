'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLastQueryDate = exports.getLastQueryDate = exports.connectToDB = undefined;

var _mongodb = require('mongodb');

var _constants = require('./constants');

var connectToDB = exports.connectToDB = function connectToDB() {
  return new Promise(function (resolve, reject) {
    return _mongodb.MongoClient.connect(_constants.DB_CONNECTION, { useNewUrlParser: true }, function (err, client) {
      return err ? reject(err) : resolve(client);
    });
  });
};

var getLastQueryDate = exports.getLastQueryDate = function getLastQueryDate(client, collection) {
  return new Promise(function (resolve, reject) {
    return collection.findOne({}, function (err, document) {
      return err ? reject(err) : resolve(document.date);
    });
  });
};

var setLastQueryDate = exports.setLastQueryDate = function setLastQueryDate(client, collection, newLastQueryDate) {
  return new Promise(function (resolve, reject) {
    return collection.updateOne({}, { $set: { date: newLastQueryDate } }, function (err, document) {
      return err ? reject(err) : resolve(document);
    });
  });
};