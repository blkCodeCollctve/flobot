const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_URI = process.env.DB_URI
export const DB_NAME = process.env.DB_NAME
export const DB_CONNECTION = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URI}`

export const SLACK_FLOBOT_WEBHOOK = process.env.SLACK_FLOBOT_WEBHOOK // #invites
export const SLACK_FLOBOT_WEBHOOK_TEST = process.env.SLACK_FLOBOT_WEBHOOK_TEST // #flobot

const TYPEFORM_ID = process.env.TYPEFORM_ID
export const TYPEFORM_KEY = process.env.TYPEFORM_KEY
export const TYPEFORM_RESPONSES_URL = `https://api.typeform.com/forms/${TYPEFORM_ID}/responses`
