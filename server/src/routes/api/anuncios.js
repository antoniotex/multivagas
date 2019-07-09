
const express = require('express')
const multer = require('multer')
const uuid = require('uuid')
const crypto = require('crypto')
const fs = require('fs')
const authMiddleware = require('../../middlewares/auth')

const router = express.Router()

// router.use(authMiddleware)

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
    cb(null, true)
  }else{
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
  console.log('entrei')
  Anuncios.find()
   .then(dadosURL => res.json(dadosURL))
})

router.get('/id/:id', function(req, res){
  console.log(req.params)
  Anuncios.findOne({ id:  req.params.id}, (error, item) => {
    if(error){
      res.json({erro: error})
      return
    }
    res.contentType('json')
    res.send(item)
  })
})

router.get('/busca', (req, res) => {
  let params = {}
  console.log('query', req.query)
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

router.post('/', authMiddleware, upload.single('imageData'), function(req, res){
  const { idUsuario, nomeUsuario, titulo, descricao, categoria, telefone, cep, cidade, bairro } = req.body
  const id = crypto.randomBytes(3).toString('hex')
  const novoItem = new Anuncios({
    idUsuario, nomeUsuario, id, titulo, descricao, categoria, telefone, cep, cidade, bairro
  })
  novoItem.dadosIMG.data = fs.readFileSync(req.file.path)
  novoItem.dadosIMG.contentType = req.file.mimetype
  novoItem.save().then(function(item){
    res.json(item)
  })
})

router.put('/:id', authMiddleware, (req, res) => {
  let updateObj = req.body
  Anuncios.updateOne({id: req.params.id}, updateObj, {new: true}, (err, item) => {
      if(err){
          res.send(err)
      }
      res.json(item)
  })
})

router.delete('/:id', authMiddleware, (req, res) => {
  Anuncios.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router