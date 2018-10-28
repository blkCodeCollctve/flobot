import axios from 'axios'

import { SLACK_FLOBOT_WEBHOOK, SLACK_FLOBOT_WEBHOOK_TEST } from '../constants'
import { formatTypeFormResponses } from './format-typeform'

const postResponseToSlack = msg => {
  axios({
    method: 'post',
    url: SLACK_FLOBOT_WEBHOOK_TEST,
    data: {
      text: msg
    },
    contentType: 'application/json'
  })
  .then(console.log('posted response to slack'))
  .catch(err => console.log(`ERROR: couldn't post response to slack: ${err}`))
}

export const postResponsesToSlack = typeformResponses =>
  formatTypeFormResponses(typeformResponses).forEach(postResponseToSlack)
