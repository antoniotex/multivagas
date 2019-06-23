const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AnuncioSchema = new Schema({
  usuario: {
    id: {
      type: String,
      required: true
    },
    nome: String
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
    required: true
  },
  dadosIMG: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  localizacao: {
    CEP: {
      type: Number,
      required: true
    },
    cidade: String,
    bairro: String
  },
  telefone: Number,
  data: {
      type: Date,
      default: Date.now
  },
})

module.exports = Anuncio = mongoose.model('anuncio', AnuncioSchema)