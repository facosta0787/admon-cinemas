'use strict'
import mongoose from 'mongoose'
const Movie = mongoose.model('Movie')
import moment from 'moment'

class MovieController{
  constructor() {
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
  }

  get(req,res){
    Movie.find({},(err,movie)=>{
      if(err) return res.status(400).send({
        status:400,
        message:err
      })

      return res.status(200).send({
        status:200,
        message:'Ok!',
        data:movie
      })
    })
  }

  create(req,res){

      if(req.body._id){
        this.update(req,res)
        return
      }

      const date = moment(req.body.releaseDate,'MM-DD-YYYY')

      if(!date.isValid()){
        return res.status(400).send({
          status: 400,
          message: 'Error: Invalid date format !'
        })
      }

      const params = {
        name:req.body.name,
        releaseDate: date.toDate(),
        language:req.body.language
      }

      let movie = new Movie(params)

      movie.save((err,movie) => {
        if(err)  return res.status(400).send(err)
        console.log(movie)
        return res.status(200).send({
          status:200,
          message:'Movie created successfully',
          data: movie
        })
      })
  }

  update(req,res){
    console.log(req.body)
    Movie.findById(req.body._id,(err,movie)=>{
      if(err) return res.status(400).send(err)

      const { name, releaseDate, language } = req.body
      const date = moment(releaseDate,'MM-DD-YYYY')

      if(!date.isValid()){
        return res.status(400).send({
          status: 400,
          message: 'Error: Invalid date format !'
        })
      }

      movie.name = name || movie.name
      movie.releaseDate = date.toDate() || movie.releaseDate
      movie.language = language ||movie.language

      movie.save((err,updatedMovie)=>{
        if(err) return res.status(400).send(err)

        return res.status(200).send({
          status:200,
          message: 'Movie updated successfully',
          data: updatedMovie
        })

      })

    })
  }

  delete(req,res){
    const { _id } = req.body
    Movie.remove({ _id },(err)=>{
      if(err) return res.status(400).send(err)

      return res.status(200).send({
        status:200,
        message: 'Movie removed successfully'
      })

    })
  }

}

export default new MovieController
