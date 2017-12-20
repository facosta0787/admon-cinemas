'use strict'
import mongoose from 'mongoose'
const Cinema = mongoose.model('Cinema')

class CinemaController{
  constructor() {
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
  }

  get(req,res){
    Cinema.find({})
      .populate('movies')
      .exec((err,cinemas) => {
        if(err) return res.status(400).send({
          status:400,
          message:err
        })

        return res.status(200).send({
          status:200,
          message:'Ok!',
          data:cinemas
        })

      })
  }

  create(req,res){

    if(req.body._id){
      this.update(req,res)
      return
    }

    let cinema = new Cinema(req.body)

    cinema.save((err,cinema) =>{
      if(err) return res.status(400).send(err)
      console.log(cinema._id)
      return res.status(200).send({
        status:200,
        message:'Cinema created successfully',
        data: cinema
      })
    })
  }

  update(req,res){
    const { _id } = req.body
    Cinema.findById(_id,(err,cinema) =>{
      if(err) return res.status(400).send(err)
      const { name, location , movies } = req.body

      cinema.name = name || cinema.name
      cinema.location = location || cinema.location
      cinema.movies = movies || cinema.movies

      cinema.save((err,updatedCinema) => {
        if(err) return res.status(400).send(err)

        return res.status(200).send({
          status:200,
          message: 'Cinema updated successfully',
          data: updatedCinema
        })
      })

    })
  }

  delete(req,res){
    const { _id } = req.body
    Cinema.remove({_id},(err)=>{
      if(err) return res.status(400).send(err)

      return res.status(200).send({
        status:200,
        message: 'Cinema removed successfully'
      })
    })
  }

}

export default new CinemaController
