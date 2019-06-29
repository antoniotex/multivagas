var express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const path = require('path')
const cors = require('cors')

var app = express()
var anuncios = require('../routes/api/anuncios')

mongoose.set('useCreateIndex', true);

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  var allowedOrigins = ['https://enc-it.firebaseapp.com', 'http://localhost:3000']
  var origin = req.headers.origin
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'https://enc-it.firebaseapp.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var bd = require('./keys').mongoURI

mongoose.connect(bd, { useNewUrlParser: true })
  .then(function(){
    console.log('Banco de Dados Conectado')
  })
  .catch(function(erro){
    console.log(erro)
  })

app.use('/api/anuncios', anuncios)

require('../routes/api/auth')(app)

module.exports = app
