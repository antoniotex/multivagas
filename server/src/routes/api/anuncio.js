
const express = require('express')
const authMiddleware = require('../../middlewares/auth')

const router = express.Router()

router.use(authMiddleware)

const Anuncio = require('../../models/anuncio')


router.get('/', function(req, res){
  Anuncio.find()
   .then(dadosURL => res.send({data: dadosURL, user: req.userId}))
})

router.get('/:id', function(req, res){
  Anuncio.findOne({ _id:  req.params.id}, (error, item) => {
    if(error){
      res.json({erro: error})
      return
    }
    res.json(item)
  })
})

router.post('/', function(req, res){
  const novoItem = new Anuncio({
    usuario: {id: 'jhd7ehdbY7&', nome: req.body.nome},
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    categoria: req.body.categoria,
    telefone: req.body.telefone,
    localizacao: { CEP: req.body.CEP, cidade: req.body.cidade, bairro: req.body.bairro }
  })
  novoItem.save().then(function(item){
    res.json(item)
  })
})

router.put('/:id', (req, res) => {
  let updateObj = req.body
  if(!!req.body.bairro){
    updateObj = { localizacao: { CEP: req.body.CEP, cidade: req.body.cidade, bairro: req.body.bairro } }
  }
  Anuncio.findOneAndUpdate({_id: req.params.id}, updateObj, {new: true}, (err, item) => {
      if(err){
          res.send(err)
      }
      res.json(item)
  })
})

router.delete('/:id', (req, res) => {
  Anuncio.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router