import mongoose from 'mongoose'
import SuperPlace from '../models/superplace.js'
import { cities } from './cities.js'
import { descriptors, places } from './seedHelpers.js'

mongoose.connect('mongodb://localhost:27017/super-place')

const db = mongoose.connection

db.on(
  'error',
  console.error.bind(console, '[Error] -> Database Connection Error: ')
)

db.once('open', () => {
  console.log('Database connected!')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await SuperPlace.deleteMany({})
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000)
    const city = cities[rand1000].city
    const state = cities[rand1000].state
    const newSuperPlace = new SuperPlace({
      location: `${city}, ${state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    })

    await newSuperPlace.save()
  }
}

seedDB().then(() => {
  console.log('Connection closed!')
  mongoose.connection.close()
})
