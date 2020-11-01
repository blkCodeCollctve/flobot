import axios from 'axios'

import {
  NODE_ENV,
  SLACK_FLOBOT_WEBHOOK, // #invites
  SLACK_FLOBOT_WEBHOOK_TEST // #flobot
} from '../constants'
import { formatTypeFormResponses } from './format-typeform'

const env = NODE_ENV || "development"
const slackWebHook = env === "production" ? SLACK_FLOBOT_WEBHOOK : SLACK_FLOBOT_WEBHOOK_TEST
const postResponseToSlack = msg => axios({
    method: 'post',
    url: slackWebHook,
    data: {
      text: msg
    },
    contentType: 'application/json'
  })

export const postResponsesToSlack = typeformResponses =>
  formatTypeFormResponses(typeformResponses).forEach(postResponseToSlack)
