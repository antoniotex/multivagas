var app = require('./config/server')

var port = process.env.PORT || 5000

app.listen(port, function(){
  console.log(`Servidor rodando na porta ${port}!!`)
})