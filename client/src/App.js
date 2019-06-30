import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import axios from 'axios'
// import defaultImg from './assets/default-img.jpg'

class App extends Component{
  // constructor(){
  //   super()
  //   this.state = {
  //     anuncios: [],
  //     nome: '',
  //     titulo: '',
  //     descricao: '',
  //     categoria: '',
  //     CEP: '',
  //     multerImage: defaultImg,
  //     dadosIMG: null
  //   }
  // }

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

  componentWillMount (){
    const mock = {
      termo: 'jardineiro',
      categoria: 'serviços',

    }
    const teste = axios.get('/api/anuncios/busca', { params: mock })
    Promise.all([teste]).then(result => {
      console.log(result[0].data)
      result[0].data.map(item => {
        console.log(item.titulo)
        console.log(item.descricao)
        console.log(item.categoria)
      })
      this.setState({ anuncios: result[0].data })
    })
  }

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
  //   if(this.state.anuncios.length >= 0){
  //     return (
  //       <div className="App">
  //       <h1>Cadastro de Anuncio</h1>
  //         <input type="file" placeholder="imagem" name="imagem" onChange={(e) => this.uploadImage(e, 'multer')}/>
  //         <input type="text" placeholder="nome" name="nome" value={this.state.nome} onChange={this.handleChange}/>
  //         <input type="text" placeholder="titulo" name="titulo" value={this.state.titulo} onChange={this.handleChange}/>
  //         <input type="text" placeholder="descricao" name="descricao" value={this.state.descricao} onChange={this.handleChange}/>
  //         <input type="text" placeholder="categoria" name="categoria" value={this.state.categoria} onChange={this.handleChange}/>
  //         <input type="number" placeholder="CEP" name="CEP" value={this.state.CEP} onChange={this.handleChange} />
  //         <button onClick={this.handleSubmit}>Cadastrar</button>
  //         <img src={this.state.multerImage} alt="upload" className="prov-img" />
  //         <h1>Anuncios</h1>
  //         {
  //           this.state.anuncios.map((item, index) => {
  //           return (
  //             <div className="card-anuncio" key={index}>
  //               <div className="card-img">
  //                 <img src={ item.dadosIMG } alt="Imagem incluida no anuncio" />
  //               </div>
  //               <div className="card-info">
  //                 <span>{item.titulo}</span>
  //                 <p>{item.descricao}</p>
  //                 <p>{item.categoria}</p>
  //                 <small>{item.usuario.nome}</small>
  //               </div>
  //             </div>
  //           )
  //         }) 
  //       }
  //       </div>
  //     );
  //   }else{
  //     return (
  //       <div className="App"><h1>Loading...</h1></div>
  //     )
  //   }
  }
}

export default App;
