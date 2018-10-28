'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postResponsesToSlack = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constants = require('../constants');

var _formatTypeform = require('./format-typeform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postResponseToSlack = function postResponseToSlack(msg) {
  (0, _axios2.default)({
    method: 'post',
    url: _constants.SLACK_FLOBOT_WEBHOOK_TEST,
    data: {
      text: msg
    },
    contentType: 'application/json'
  }).then(console.log('posted response to slack')).catch(function (err) {
    return console.log('ERROR: couldn\'t post response to slack: ' + err);
  });
};

var postResponsesToSlack = exports.postResponsesToSlack = function postResponsesToSlack(typeformResponses) {
  return (0, _formatTypeform.formatTypeFormResponses)(typeformResponses).forEach(postResponseToSlack);
};