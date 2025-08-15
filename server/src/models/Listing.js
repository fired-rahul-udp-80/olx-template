import mongoose from 'mongoose'

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  category: String,
  subcategory: String,
  attributes: { type: Object, default: {} },
  images: [String]
}, { timestamps: true })

export default mongoose.model('Listing', ListingSchema)
