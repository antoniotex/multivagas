
const express = require('express')
const path = require('path')
const multer = require('multer')
const authMiddleware = require('../../middlewares/auth')

const router = express.Router()

// router.use(authMiddleware)

const Anuncio = require('../../models/anuncio')

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
  Anuncio.find()
   .then(dadosURL => res.json(dadosURL))
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

router.post('/', upload.single('imageData'), function(req, res){
  // if (!req.file) return res.send('Please upload a file')
  // console.log('req.file', req.file)
  console.log('req.body', req.body)
  const novoItem = new Anuncio({
    usuario: {id: 'jhd7ehdbY7&', nome: req.body.nome},
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    categoria: req.body.categoria,
    telefone: req.body.telefone,
    localizacao: { CEP: req.body.CEP, cidade: req.body.cidade, bairro: req.body.bairro },
    nomeIMG: req.body.nomeIMG,
    dadosIMG: req.file.path
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