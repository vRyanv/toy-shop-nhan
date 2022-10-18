const path = require('path')

//add library dev
// const morgan = require('morgan')

//add library
const express = require('express')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')

const indexRoute = require('./routes/index.route')

const app = express()

//[GET] image from public
app.use(express.static(path.join(__dirname, 'public/')))

//middleware to get post method value
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

//HTTP logger for dev
// app.use(morgan('combined'))

//Template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/View'))

//Rout init
indexRoute(app)

app.listen( process.env.PORT || 1234, () => console.log(`listen request`))