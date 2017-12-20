'use strict'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MovieSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  releaseDate:{
    type: Date,
    required: true
  },
  language:{
    type: String,
    required: true
  }
},{
  timestamps: true
})

export default mongoose.model('Movie',MovieSchema)
