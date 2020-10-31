import { MongoClient } from 'mongodb'
import { DB_URI } from './constants'

export const connectToDB = () =>
  new Promise((resolve, reject) => MongoClient.connect(DB_URI, { useNewUrlParser: true }, (err, client) =>
    err ? reject(err) : resolve(client)
  ))

export const getLastQueryDate = (client, collection) =>
  new Promise((resolve, reject) => collection.findOne({}, (err, document) =>
    err ? reject(err) : resolve(document.date)
  ))

export const setLastQueryDate = (client, collection, newLastQueryDate) =>
  new Promise((resolve, reject) => collection.updateOne({}, { $set: { date: newLastQueryDate } }, (err, document) =>
    err ? reject(err) : resolve(document)
))
