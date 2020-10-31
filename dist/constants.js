'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DB_URI = exports.DB_URI = process.env.DB_URI;
var LAST_QUERY_DOCUMENT = exports.LAST_QUERY_DOCUMENT = 'lastQuery';

var SLACK_FLOBOT_WEBHOOK = exports.SLACK_FLOBOT_WEBHOOK = process.env.SLACK_FLOBOT_WEBHOOK; // #invites
var SLACK_FLOBOT_WEBHOOK_TEST = exports.SLACK_FLOBOT_WEBHOOK_TEST = process.env.SLACK_FLOBOT_WEBHOOK_TEST; // #flobot

var TYPEFORM_ID = process.env.TYPEFORM_ID;
var TYPEFORM_KEY = exports.TYPEFORM_KEY = process.env.TYPEFORM_KEY;
var TYPEFORM_RESPONSES_URL = exports.TYPEFORM_RESPONSES_URL = 'https://api.typeform.com/forms/' + TYPEFORM_ID + '/responses';

var NAME_FIELD_ID = exports.NAME_FIELD_ID = '39429982';
var EMAIL_FIELD_ID = exports.EMAIL_FIELD_ID = '39431729';
var MEETUP_URL_FIELD_ID = exports.MEETUP_URL_FIELD_ID = '59348020';
var EXPERIENCE_FIELD_ID = exports.EXPERIENCE_FIELD_ID = '39430036';
var LANGUAGE_FIELD_ID = exports.LANGUAGE_FIELD_ID = '39429985';
var HOPES_FIELD_ID = exports.HOPES_FIELD_ID = '39431226';