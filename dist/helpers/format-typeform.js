'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTypeFormResponses = undefined;

var _constants = require('../constants');

var formatMultiSelectField = function formatMultiSelectField(answer) {
  var otherFieldStr = answer.choices.other || '';
  var multiFieldArr = answer.choices.labels || [];

  // format multi-select field
  var formattedMultiFields = multiFieldArr.length > 0 ? multiFieldArr.join(', ') : '';

  // add "other" free-form field to multi-select field if both exist
  if (formattedMultiFields) {
    return otherFieldStr ? formattedMultiFields + ', ' + otherFieldStr : formattedMultiFields;
  }

  // return other field if multi-select field is empty
  return otherFieldStr;
};

var formatFieldLabel = function formatFieldLabel(text) {
  return '*' + text + ':*';
};

/**
 * the formatAnswer function is specific to the format of the typeform based on
 * https://developer.typeform.com/responses/reference/retrieve-responses/
 */
var formatAnswer = function formatAnswer(answer) {
  switch (answer.field.id) {
    case _constants.NAME_FIELD_ID:
      return formatFieldLabel('Name') + ' ' + answer.text;
    case _constants.EMAIL_FIELD_ID:
      return formatFieldLabel('Email') + ' ' + answer.email;
    case _constants.MEETUP_URL_FIELD_ID:
      return formatFieldLabel('Meetup Profile') + ' ' + answer.text;
    case _constants.EXPERIENCE_FIELD_ID:
      return formatFieldLabel('Years of Programming/IT Experience') + ' ' + answer.text;
    case _constants.LANGUAGE_FIELD_ID:
      return formatFieldLabel('Current Languages') + ' ' + answer.text;
    case _constants.HOPES_FIELD_ID:
      return formatFieldLabel('Hopes and Dreams') + ' ' + formatMultiSelectField(answer);
    default:
      console.log('ERROR: unexpected field in typeform response from ' + answer.email);
      return '';
  }
};

var replacementMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&git;'

  /**
  * encodeForSlack replaces the three characters Slack doesnt allow: &, <, >
  */
};var encodeForSlack = function encodeForSlack(msg) {
  return msg.replace(/<|>|&/gi, function (matched) {
    return replacementMap[matched];
  });
};

var formatTypeFormResponses = exports.formatTypeFormResponses = function formatTypeFormResponses(items) {
  return items.map(function (item) {
    return encodeForSlack(item.answers.reduce(function (answersAcc, answer) {
      return answersAcc ? '' + answersAcc + formatAnswer(answer) + '\n' : formatAnswer(answer) + '\n';
    }, ''));
  });
};