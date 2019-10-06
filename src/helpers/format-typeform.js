import {
  NAME_FIELD_ID,
  EMAIL_FIELD_ID,
  MEETUP_URL_FIELD_ID,
  EXPERIENCE_FIELD_ID,
  LANGUAGE_FIELD_ID,
  HOPES_FIELD_ID
} from '../constants'

const formatMultiSelectField = answer => {
  const otherFieldStr = answer.choices.other || ''
  const multiFieldArr = answer.choices.labels || []

  // format multi select field
  const formattedMultiFields = multiFieldArr.length > 0 ? multiFieldArr.join(', ') : ''

  // add other field to multi select field if both exist
  if (formattedMultiFields) {
    return otherFieldStr ? `${formattedMultiFields}, ${otherFieldStr}` : formattedMultiFields
  }

  // return other field if multi select field is empty
  return otherFieldStr
}

/**
 * the formatAnswer function is specific to the format of the typeform based on
 * https://developer.typeform.com/responses/reference/retrieve-responses/
 */
const formatAnswer = answer => {
  switch (answer.field.id) {
    case NAME_FIELD_ID:
      return `*Name:* ${answer.text}`
    case EMAIL_FIELD_ID:
      return `*Email:* ${answer.email}`
    case MEETUP_URL_FIELD_ID:
      return `*Meetup Profile:* ${answer.text}`
    case EXPERIENCE_FIELD_ID:
      return `*Years of Programming/IT Experience:* ${answer.text}`
    case LANGUAGE_FIELD_ID:
      return `*Current Languages:* ${answer.text}`
    case HOPES_FIELD_ID:
      return `*Hopes and Dreams:* ${formatMultiSelectField(answer)}`
    default:
      console.log(`ERROR: unexpected field in typeform response from ${answer.email}`)
      return ''
  }
}

const replacementMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&git;'
}

/**
* encodeForSlack replaces the three characters Slack doesnt allow: &, <, >
*/
const encodeForSlack = msg => msg.replace(/<|>|&/gi, matched => replacementMap[matched])

export const formatTypeFormResponses = items =>
  items.map(
    item => encodeForSlack(item.answers.reduce(
      (answersAcc, answer) => answersAcc ? `${answersAcc}${formatAnswer(answer)}\n` : `${formatAnswer(answer)}\n`, ''
    ))
  )
