import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SuperPlaceSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String,
})

export default mongoose.model('SuperPlace', SuperPlaceSchema)
