const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

// Next é chamado caso o usuario possa acessar o controller
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader){
    return res.status(401).send({ erro: 'O token não foi informado' })
  }

  // Formato token: Bearer ioaniecebubwxuxbaicvqebicbeuvxywdgvcgdveybxw
  const partes = authHeader.split(' ')

  if(partes.length !== 2){
    return res.status(401).send({ erro: 'Erro de token' })
  }

  const [ scheme, token ] = partes

  if(!/^Bearer$/i.test(scheme)){
    return res.status(401).send({ erro: 'Token não está formatado' })
  }

  jwt.verify(token, authConfig.secret, (erro, decoded) => {
    if(erro) return res.status(401).send({ erro: 'Token inválido' })

    req.userId = decoded.id
    return next()
  })

}