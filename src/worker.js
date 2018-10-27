import { MongoClient } from 'mongodb'
import {
  DB_NAME,
  DB_CONNECTION,
  SLACK_FLOBOT_WEBHOOK,
  TYPEFORM_KEY
} from './constants'

MongoClient.connect(DB_CONNECTION, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log(`ERROR: can't connect to db: ${err}`)
    return
  }

  const db = client.db(DB_NAME)
  const collection = db.collection('lastQuery')

  collection.findOne({}, (err, document) => {
    if (err) {
      console.log(`ERROR: can't find 'lastQuery' document: ${err}`)
      return
    }

    console.log(`last queried ${document.date}`)

    // TODO: Add worker logic here

    const newLastQueryDate = new Date().toString()
    collection.updateOne({}, { $set: { date: newLastQueryDate } }, (err, doc) => {
      if (err) {
        console.log(`ERROR: can't update 'lastQuery' document: ${err}`)
        return
      }
      console.log(`last query date set to ${newLastQueryDate}`)
      client.close()
    })
  })
})
