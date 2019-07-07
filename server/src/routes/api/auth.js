const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Usuario = require('../../models/usuario')
const authConfig = require('../../config/auth.json')
const mailer = require('../../modules/mailer')

const router = express.Router()

function gerarToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

router.post('/registro', async(req, res) => {
  const { email } = req.body
  console.log(req.body)
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
    return res.status(400).json({ erro: 'Usuário não encontrado' })
  }

  if(!await bcrypt.compare(senha, usuario.senha)){
    return res.status(400).send({ erro: 'Senha inválida' })
  }

  usuario.senha = undefined

  res.send({ usuario, token: gerarToken({ id: usuario._id })})
})

// Rota de "Esqueci minha senha"
router.post('/forgot_password', async (req, res) => {
  const { email } = req.body

  try{
    const usuario = await Usuario.findOne({ email })
    if(!usuario){ return res.status(400).send({ erro: 'Usuário não encontrado' }) }

    const token = crypto.randomBytes(20).toString('hex')
    const now = new Date()
    now.setHours(now.getHours() + 1)
    console.log('cheguei aqui', usuario);

    // await Usuario.updateOne(usuario._id, {
    //   '$set': {
    //     resetSenhaToken: token,
    //     resetSenhaExp: now
    //   }
    // })  

    Anuncios.updateOne({id: usuario._id}, { resetSenhaToken: token, resetSenhaExp: now }, {new: true}, (err, item) => {
      if(err){
        res.send(err)
      }
    })

    mailer.sendMail({
      to: email,
      from: 'acm.skt@gmail.com',
      template: 'forgot_password',
      context: { token },
    }, (erro) => {
      console.log(erro)
      if(erro){ res.status(400).send({ erro: 'Não foi possível enviar e-mail de alteração de senha' }) }

      return res.send({ msg: 'O e-mail com o o token foi enviado' })
    })
  }
  catch(erro){
    console.log(erro)
    res.status(400).send({ erro: 'Falha ao recuperar senha, tente novamente'})
  }
})

router.post('/reset_password', async (req, res) => {
  const { email, senha } = req.body

  try{
    const usuario = await Usuario.findOne({ email })
      .select('resetSenhaToken resetSenhaExp')

    console.log(usuario);

    if(!usuario){ return res.status(400).send({ erro: 'Usuário não encontrado' }) }

    const senhaToken = JSON.stringify(usuario.resetSenhaToken)
    const token = JSON.stringify(req.body.token)
    if(token !== senhaToken){ return res.status(400).send({ erro: 'Token invalido, gere outro' }) }

    const now = new Date()
    if(now > usuario.resetSenhaExp){ return res.status(400).send({ erro: 'Token expirado, gere um novo token' }) }

    usuario.senha = senha

    usuario.save()

    res.send()


  }catch(erro){
    console.log(erro)
    res.status(400).send({ erro: 'Não pude resetar sua senha' })
  }
})

// Toda vez que for requisitado /auth, esse rota aqui será chamada
module.exports = app => app.use('/auth', router)


