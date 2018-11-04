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
  return (0, _axios2.default)({
    method: 'post',
    url: _constants.SLACK_FLOBOT_WEBHOOK_TEST, //SLACK_FLOBOT_WEBHOOK_TEST,
    data: {
      text: msg
    },
    contentType: 'application/json'
  });
};

var postResponsesToSlack = exports.postResponsesToSlack = function postResponsesToSlack(typeformResponses) {
  return (0, _formatTypeform.formatTypeFormResponses)(typeformResponses).forEach(postResponseToSlack);
};