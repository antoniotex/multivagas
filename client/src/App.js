import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import defaultImg from './assets/default-img.jpg'

class App extends Component{
  constructor(){
    super()
    this.state = {
      nome: '',
      titulo: '',
      descricao: '',
      categoria: '',
      CEP: '',
      multerImage: defaultImg,
      dadosIMG: null
    }
  }

  render(){
    return (
      <Routes />
    )
  }
}

export default App;
