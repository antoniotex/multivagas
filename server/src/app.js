var app = require('./config/server')
const express = require('express')

var port = process.env.PORT || 5000

app.use('/uploads', express.static('uploads'))

app.listen(port, function(){
  console.log(`Servidor rodando na porta ${port}!!`)
})