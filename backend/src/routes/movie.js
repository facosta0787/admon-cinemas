import express from 'express'
import controller from '../controllers/moviesController'

const route = express.Router()

route.get('/',controller.get)
.post('/',controller.create)
.patch('/',controller.update)
.delete('/',controller.delete)

export default route
