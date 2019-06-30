const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AnunciosSchema = new Schema({
  idUsuario: {
    type: String,
    required: true
  },
  nomeUsuario: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  nomeIMG: {
    type: String,
    default: "none",
    // required: true
  },
  dadosIMG: {
    type: String,
    // required: true
  },
  categoria: {
    type: String,
    required: true
  },
  cep: {
    type: Number,
    required: true
  },
  cidade: {
    type:String,
    required: true
  },
  bairro: {
    type:String,
    required: true
  },
  telefone: Number,
  data: {
      type: Date,
      default: Date.now
  },
})

module.exports = Anuncios = mongoose.model('anuncios', AnunciosSchema)