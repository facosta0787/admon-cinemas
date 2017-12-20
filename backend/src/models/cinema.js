'use strict'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CinemaSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  movies:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]
},{
  timestamps: true
})

export default mongoose.model('Cinema',CinemaSchema)
