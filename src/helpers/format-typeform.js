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
    case '39429982': // name field id
      return `*Name:* ${answer.text}`
    case '39431729': // email field id
      return `*Email:* ${answer.email}`
    case '59348020': // meetup url field id
      return `*Meetup Profile:* ${answer.text}`
    case '39430036': // experience field id
      return `*Years of Programming/IT Experience:* ${answer.text}`
    case '39429985': // language field id
      return `*Current Languages:* ${answer.text}`
    case '39431226': // hopes field id
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
