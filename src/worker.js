import "@babel/polyfill"

import { DB_NAME, LAST_QUERY_DOCUMENT } from './constants'
import getTypeFormResponses from './helpers/get-typeform-responses'
import { postResponsesToSlack } from './helpers/post-to-slack'
import {
  connectToDB,
  getLastQueryDate,
  setLastQueryDate
} from './db'

export const runFlobot = async () => {
  const newLastQueryDateString = new Date().toString()
  let client,
      db,
      collection,
      lastQueryDateString,
      typeformResponses

  // connect to db
  try {
    client = await connectToDB()
    db = client.db(DB_NAME)
    collection = db.collection(LAST_QUERY_DOCUMENT)
  } catch(err) {
     console.log(`ERROR: can't connect to db: ${err}`)
     client.close()
     return
  }

  // get last query date
  try {
    lastQueryDateString = await getLastQueryDate(client, collection)
    console.log(`last queried ${lastQueryDateString}`)
  } catch(err) {
    console.log(`ERROR: can't find '${LAST_QUERY_DOCUMENT}' document: ${err}`)
    client.close()
    return
  }

  // get typeform responses
  try {
    const lastQueryDate = new Date(lastQueryDateString)
    typeformResponses = (await getTypeFormResponses(lastQueryDate)).data.items
  } catch(err) {
    console.log(`ERROR: could not get typeform responses: ${err}`)
    client.close()
    return
  }

  // post typeform responses to slack
  try {
    await postResponsesToSlack(typeformResponses)
    console.log(`posted responses to slack`)
  } catch(err) {
    console.log(`ERROR: couldn't post responses to slack: ${err}`)
    client.close()
    return
  }

  // set new last query date
  try {
    await setLastQueryDate(client, collection, newLastQueryDateString)
    console.log(`last query date set to ${newLastQueryDateString}`)
  } catch(err) {
    console.log(`ERROR: can't update '${LAST_QUERY_DOCUMENT}' document: ${err}`)
  }

  client.close()
}

runFlobot()
