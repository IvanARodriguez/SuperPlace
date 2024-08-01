import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SuperPlaceSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  imageUri: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
})

export default mongoose.model('SuperPlace', SuperPlaceSchema)
