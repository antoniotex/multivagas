const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../../models/usuario')
const authConfig = require('../../config/auth.json')

const router = express.Router()

function gerarToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

router.post('/registro', async(req, res) => {
  const { email } = req.body
  try{
    if(await Usuario.findOne({ email })){
      return res.status(400).send({erro: `Já existe um usuário com o e-mail ${ email }`})
    }
    const usuario = await Usuario.create(req.body)

    usuario.senha = undefined

    return res.send({ usuario, token: gerarToken({ id: usuario._id }) })
  }
  catch(erro){
    console.log(erro)
    return res.status(400).send({erro: 'Falha no registro'})
  }
})

router.post('/authenticate', async (req, res) => {
  const { email, senha } = req.body
  const usuario = await Usuario.findOne({ email }).select('+senha')

  if(!usuario){
    console.log(1)
    return res.status(400).send({ erro: 'Usuário não encontrado' })
  }

  if(!await bcrypt.compare(senha, usuario.senha)){
    console.log(1)
    return res.status(400).send({ erro: 'Senha inválida' })
  }

  usuario.senha = undefined

  res.send({ usuario, token: gerarToken({ id: usuario._id })})
})

// Toda vez que for requisitado /auth, esse rota aqui será chamada
module.exports = app => app.use('/auth', router)


