const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  resetSenhaToken: {
    tyoe: String,
    select: false,
  },
  resetSenhaExp: {
    type: Date,
    select: false
  },
  dataCriacao: {
      type: Date,
      default: Date.now
  },
})

UsuarioSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.senha, 10)
  this.senha = hash

  next()
})

module.exports = Usuario = mongoose.model('usuario', UsuarioSchema)