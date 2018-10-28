'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runFlobot = undefined;

var _mongodb = require('mongodb');

var _getTypeformResponses = require('./helpers/get-typeform-responses');

var _getTypeformResponses2 = _interopRequireDefault(_getTypeformResponses);

var _postToSlack = require('./helpers/post-to-slack');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setLastQueryDate = function setLastQueryDate(client, collection) {
  var newLastQueryDate = new Date().toString();

  collection.updateOne({}, { $set: { date: newLastQueryDate } }, function (err, doc) {
    if (err) {
      console.log('ERROR: can\'t update \'lastQuery\' document: ' + err);
      return;
    }
    console.log('last query date set to ' + newLastQueryDate);
    client.close();
  });
};

var getLastQueryDate = function getLastQueryDate(client, collection) {
  collection.findOne({}, function (err, document) {
    if (err) {
      console.log('ERROR: can\'t find \'lastQuery\' document: ' + err);
      return;
    }

    console.log('last queried ' + document.date);

    var lastQueryDate = new Date(document.date);
    (0, _getTypeformResponses2.default)(lastQueryDate, _postToSlack.postResponsesToSlack);

    setLastQueryDate(client, collection);
  });
};

var runFlobot = exports.runFlobot = function runFlobot() {
  return _mongodb.MongoClient.connect(_constants.DB_CONNECTION, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      console.log('ERROR: can\'t connect to db: ' + err);
      return;
    }

    var db = client.db(_constants.DB_NAME);
    var collection = db.collection('lastQuery');
    getLastQueryDate(client, collection);
  });
};