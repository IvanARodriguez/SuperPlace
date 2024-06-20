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

const sampleImages = [
  'https://firebasestorage.googleapis.com/v0/b/super-place.appspot.com/o/superplace%2Fcamp-1.webp?alt=media&token=81da6981-1aae-4b35-b9bd-980e70f2c295',
  'https://firebasestorage.googleapis.com/v0/b/super-place.appspot.com/o/superplace%2Fsuperplace-1.webp?alt=media&token=7fa48ca9-e658-4ef5-a789-54f426c70765',
  'https://firebasestorage.googleapis.com/v0/b/super-place.appspot.com/o/superplace%2Fsuperplace-2.webp?alt=media&token=4251a8c7-130a-40da-8245-f73c607de2a7',
  'https://firebasestorage.googleapis.com/v0/b/super-place.appspot.com/o/superplace%2Fsuperplace-3.webp?alt=media&token=15112df0-87f8-49ad-a994-e415ae3d2292',
  'https://firebasestorage.googleapis.com/v0/b/super-place.appspot.com/o/superplace%2Fsuperplace-4.webp?alt=media&token=4f6f0b32-1edb-421d-8965-dcc8c8bdd45a',
]

const seedDB = async () => {
  await SuperPlace.deleteMany({})
  for (let i = 0; i < 5; i++) {
    const rand1000 = Math.floor(Math.random() * 1000)
    const city = cities[rand1000].city
    const state = cities[rand1000].state
    const price = Math.floor(Math.random() * 20) + 10
    const newSuperPlace = new SuperPlace({
      location: `${city}, ${state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, reiciendis! Omnis officia numquam modi.',
      imageUri: sampleImages[i],
      price,
    })

    await newSuperPlace.save()
  }
}

seedDB().then(() => {
  console.log('Connection closed!')
  mongoose.connection.close()
})
