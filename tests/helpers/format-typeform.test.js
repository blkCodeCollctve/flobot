
const assert = require('assert');
const whatever = require('../../dist/helpers/format-typeform')
const {
    NAME_FIELD_ID,
    EMAIL_FIELD_ID,
    MEETUP_URL_FIELD_ID,
    EXPERIENCE_FIELD_ID,
    LANGUAGE_FIELD_ID,
    HOPES_FIELD_ID
} = require('../../dist/constants')

const expectedName = 'Whoever Whatever'
const expectedEmail = 'whoever@whatever.com'
const expectedMeetupProfile = 'https://www.meetup.com/members/bleh'
const expectedExperience = '&lt; 1'
const expectedLanguage = 'Javascript'
const expectedHopes = 'Mentoring opportunities'
const validInput = [
	{
		answers: [
			{
				field: {
					id: NAME_FIELD_ID
				},
				text: expectedName
			},
			{
				field: {
					id: EMAIL_FIELD_ID
				},
				email: expectedEmail
			},
			{
				field: {
					id: MEETUP_URL_FIELD_ID
				},
				text: expectedMeetupProfile
			},
			{
				field: {
					id: EXPERIENCE_FIELD_ID
				},
				text: '< 1'
			},
			{
				field: {
					id: LANGUAGE_FIELD_ID
				},
				text: expectedLanguage
			},
			{
				field: {
					id: HOPES_FIELD_ID
				},
				choices: {
					labels: [
						expectedHopes
					]
				}
			}
		]
	}
]

describe(`formatTypeFormResponses`, () => {
  it(`given an invalid input of %p throws a TypeError`, () => {
    const invalidAnswerFieldID = {
      field: {
      	id: 3
      }
    }
    const invalidInputs = [3, null, invalidAnswerFieldID]

    invalidInputs.forEach(invalidInput => {
      assert.throws(
        () => whatever.formatTypeFormResponses(invalidInput),
        { name: 'TypeError' }
			)
    })
  })

  it(`given an invalid input of 'three' throws an Error`, () => {
    const invalidInput = 'three'

    assert.throws(
        () => whatever.formatTypeFormResponses(invalidInput),
        { name: 'TypeError' }
    )
  })

  it(`given a valid response returns a reformatted response`, () => {
		const expectedResponse = [
			`*Name:* ${expectedName}\n*Email:* ${expectedEmail}\n*Meetup Profile:* ${expectedMeetupProfile}\n` +
			`*Years of Programming/IT Experience:* ${expectedExperience}\n*Current Languages:* ${expectedLanguage}\n` +
			`*Hopes and Dreams:* ${expectedHopes}\n`
		]
    const actualResponse = whatever.formatTypeFormResponses(validInput)
		assert.equal(actualResponse.length, 1)
		assert.deepEqual(actualResponse, expectedResponse)
  })
})
