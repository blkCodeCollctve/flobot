'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatMultiSelectField = function formatMultiSelectField(answer) {
  var otherFieldStr = answer.choices.other;
  var multiFieldArr = answer.choices.labels || [];

  var formattedMultiFields = multiFieldArr.length > 0 ? multiFieldArr.reduce(function (acc, curr) {
    return acc ? acc + ', ' + curr : '' + curr;
  }, '') : '';

  return otherFieldStr ? formattedMultiFields + ', ' + otherFieldStr : formattedMultiFields;
};

/**
 * the formatAnswer function is specific to the format of the typeform based on
 * https://developer.typeform.com/responses/reference/retrieve-responses/
 */
var formatAnswer = function formatAnswer(answer) {
  switch (answer.field.id) {
    case '39429982':
      // name field id
      return '*Name:* ' + answer.text;
    case '39431729':
      // email field id
      return '*Email:* ' + answer.email;
    case '59348020':
      // meetup url field id
      return '*Meetup Profile:* ' + answer.text;
    case '39430036':
      // experience field id
      return '*Years of Programming/IT Experience:* ' + answer.text;
    case '39429985':
      // language field id
      return '*Current Languages:* ' + answer.text;
    case '39431226':
      // hopes field id
      return '*Hopes and Dreams:* ' + formatMultiSelectField(answer);
    default:
      console.log('ERROR: unexpected field in typeform response');
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