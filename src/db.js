import { MongoClient } from 'mongodb'

import getTypeFormResponses from './helpers/get-typeform-responses'
import { postResponsesToSlack } from './helpers/post-to-slack'
import {
  DB_NAME,
  DB_CONNECTION
} from './constants'

const setLastQueryDate = (client, collection) => {
  const newLastQueryDate = new Date().toString()
  collection.updateOne({}, { $set: { date: newLastQueryDate } }, (err, doc) => {
    if (err) {
      console.log(`ERROR: can't update 'lastQuery' document: ${err}`)
      return
    }
    console.log(`last query date set to ${newLastQueryDate}`)
    client.close()
  })
}

const getLastQueryDate = (client, collection) => {
  collection.findOne({}, (err, document) => {
    if (err) {
      console.log(`ERROR: can't find 'lastQuery' document: ${err}`)
      return
    }

    console.log(`last queried ${document.date}`)

    const lastQueryDate = new Date(document.date)
    getTypeFormResponses(lastQueryDate, postResponsesToSlack)

    setLastQueryDate(client, collection)
  })
}

export const runFlobot = () =>
  MongoClient.connect(DB_CONNECTION, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log(`ERROR: can't connect to db: ${err}`)
      return
    }

    const db = client.db(DB_NAME)
    const collection = db.collection('lastQuery')
    getLastQueryDate(client, collection)
  })
