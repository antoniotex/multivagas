const express = require('express')
const Usuario = require('../../models/usuario')

const router = express.Router()

router.post('/registro', async(req, res) => {
  try{
    if(await Usuario.findOne({ email: req.body.email })){
      return res.status(400).send({erro: `Já existe um usuário com o e-mail ${ req.body.email }`})
    }
    const usuario = await Usuario.create(req.body)

    usuario.password = undefined

    return res.send({ usuario })
  }
  catch(erro){
    return res.status(400).send({erro: 'Falha no registro'})
  }
})

// Toda vez que for requisitado /auth, esse rota aqui será chamada
module.exports = app => app.use('/auth', router)


