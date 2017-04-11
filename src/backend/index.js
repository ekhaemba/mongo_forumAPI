var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')

const userRoutes = require("./routes/userRoutes"),
      forumRoutes = require("./routes/forumRoutes")
      
const dbName = require("./config/main").database

var app = express()
var router = express.Router()
router.use(bodyParser.json());

const port = 8080
mongoose.connect(dbName)
mongoose.Promise = global.Promise


router.use(userRoutes)
router.use(forumRoutes)

//Morgan middleware to log all requests made to the server
app.use(morgan('combined'))
//Use the router
app.use(router)

app.listen(port)
