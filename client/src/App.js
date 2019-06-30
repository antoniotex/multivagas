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

  //   setDefaultImage() {
  //   this.setState({
  //     multerImage: defaultImg
  //   });
  // }

  // uploadImage(e, method) {
  //     let imageFormObj = new FormData();
  //     imageFormObj.append("imageName", "multer-image-" + Date.now());
  //     imageFormObj.append("imageData", e.target.files[0]);
  //     console.log(e.target.files[0].size)
  //   this.setState({
  //     multerImage: URL.createObjectURL(e.target.files[0]),
  //     dadosIMG: imageFormObj
  //   });
  // }

  // handleChange = (event) => {
  //   this.setState({[event.target.name]: event.target.value})
  // }

  // handleSubmit = () => {
  //   const { nome, descricao, titulo, categoria, CEP, dadosIMG } = this.state
  //   dadosIMG.append("nome", nome)
  //   dadosIMG.append("titulo", titulo)
  //   dadosIMG.append("descricao", descricao)
  //   dadosIMG.append("categoria", categoria)
  //   dadosIMG.append("CEP", CEP)
  //   const config = {
  //     headers: {
  //         'content-type': 'multipart/form-data'
  //     }
  // };
  //   axios.post('/api/anuncio', dadosIMG, config).then(result => {
  //     console.log(result.data)
  //     this.setDefaultImage();
  //     this.setState(state => {
  //       const anuncios = state.anuncios.concat(result.data)
  //       return {
  //         anuncios
  //       }
  //     })
  //   })
  // }

  render(){
    return (
      <Routes />
    )
  }
}

export default App;
