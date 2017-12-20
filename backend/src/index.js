import chalk from 'chalk'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import movie from './models/movie'
import cinema from './models/cinema'
import router from './routes'
const  PORT = process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/softdevteam',{ useMongoClient: true })

const app = express()
app.use('/', express.static(__dirname + '/static'))
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Authorization, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/movie',router.movie)
app.use('/api/cinema',router.cinema)

app.listen(PORT, () =>  {
  console.log(chalk.green(`Server is running and listening on http://localhost:${PORT}`))
} )
