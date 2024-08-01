import mongoose, { Schema } from 'mongoose'

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  createdAt: Date,
})

export default mongoose.model('Review', reviewSchema)
