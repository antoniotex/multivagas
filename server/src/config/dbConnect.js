var mongoose = require('mongoose')

var bd = require('./keys').mongoURI

mongoose.connect(bd, { useNewUrlParser: true })
  .then(function(){
    console.log('Banco de Dados Conectado')
  })
  .catch(function(erro){
    console.log(erro)
  })