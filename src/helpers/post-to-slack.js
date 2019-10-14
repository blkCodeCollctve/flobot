import axios from 'axios'

import { SLACK_FLOBOT_WEBHOOK } from '../constants'
import { formatTypeFormResponses } from './format-typeform'

const postResponseToSlack = msg => axios({
    method: 'post',
    url: SLACK_FLOBOT_WEBHOOK,
    data: {
      text: msg
    },
    contentType: 'application/json'
  })

export const postResponsesToSlack = typeformResponses =>
  formatTypeFormResponses(typeformResponses).forEach(postResponseToSlack)
