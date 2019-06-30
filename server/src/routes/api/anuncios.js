
const express = require('express')
const path = require('path')
const multer = require('multer')
const uuid = require('uuid')
const crypto = require('crypto')
const authMiddleware = require('../../middlewares/auth')

const router = express.Router()

router.use(authMiddleware)

const Anuncios = require('../../models/anuncios')

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    console.log('acc')
    cb(null, true)
  }else{
    console.log('rejeitou o file')
    // Rejeita o armazenamento
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

router.get('/', function(req, res){
  Anuncios.find()
   .then(dadosURL => res.json(dadosURL))
})

router.get('id/:id', function(req, res){
  Anuncios.findOne({ _id:  req.params.id}, (error, item) => {
    if(error){
      res.json({erro: error})
      return
    }
    res.json(item)
  })
})

router.get('/busca', (req, res) => {
  let params = {}
  if(req.query.termo){
    params = {
      $or: []
    }
    params.$or.push({ titulo: new RegExp(req.query.termo, 'i') }, { descricao: new RegExp(req.query.termo, 'i') })
  }
  if(req.query.categoria){
    params.categoria = req.query.categoria
  }
  if(req.query.cidade){
    params.cidade = req.query.cidade
  }
  if(req.query.bairro){
    params.bairro = req.query.bairro
  }

  console.log('PARAMS', params)

  Anuncios.find(params, (error, item) => {
    if(error){
      res.json({erro: error})
      return
    }
    res.send(item)
  })
})

router.post('/', upload.single('imageData'), function(req, res){
  // if (!req.file) return res.send('Please upload a file')
  // console.log('req.file', req.file)
  const novoItem = new Anuncios({
    idUsuario: uuid(),
    nomeUsuario: req.body.nomeUsuario,
    id: crypto.randomBytes(3).toString('hex'),
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    categoria: req.body.categoria,
    telefone: req.body.telefone,
    cep: req.body.cep,
    cidade: req.body.cidade,
    bairro: req.body.bairro,
    nomeIMG: req.body.nomeIMG ? req.body.nomeIMG : 'none',
    dadosIMG: req.file ? req.file.path : 'none'
  })
  novoItem.save().then(function(item){
    res.json(item)
  })
})

router.put('/:id', (req, res) => {
  let updateObj = req.body
  Anuncios.updateOne({_id: req.params.id}, updateObj, {new: true}, (err, item) => {
      if(err){
          res.send(err)
      }
      res.json(item)
  })
})

router.delete('/:id', (req, res) => {
  Anuncios.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router