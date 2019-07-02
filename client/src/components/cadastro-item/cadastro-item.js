import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from '../../services/api'
import './cadastro-item.css'
import defaultImg from '../../assets/default-img.jpg'
import loadingImg from '../../assets/gear.svg'
import { getName } from "../../services/auth";

class CadastroItem extends Component {
  state = {
    nomeUsuario: getName(),
    titulo: '',
    descricao: '',
    categoria: '',
    cep: '',
    cidade: '',
    bairro: '',
    telefone: '',
    multerImage: defaultImg,
    dadosIMG: null,
    loading: false
  }

    setDefaultImage() {
    this.setState({
      multerImage: defaultImg
    });
  }

  uploadImage(e, method) {
      e.preventDefault()
      let imageFormObj = new FormData();
      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);
      console.log(e.target.files[0].size)
    this.setState({
      multerImage: URL.createObjectURL(e.target.files[0]),
      dadosIMG: imageFormObj
    });
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    const { nomeUsuario, titulo, descricao, categoria, cep, cidade, bairro, telefone, dadosIMG } = this.state
    dadosIMG.append("nomeUsuario", nomeUsuario)
    dadosIMG.append("titulo", titulo)
    dadosIMG.append("descricao", descricao)
    dadosIMG.append("categoria", categoria)
    dadosIMG.append("cep", cep)
    dadosIMG.append("cidade", cidade)
    dadosIMG.append("bairro", bairro)
    dadosIMG.append("telefone", telefone)
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    console.log(dadosIMG);
    api.post('/api/anuncios', dadosIMG, config).then(result => {
      console.log('retorno apos post: ', result.data)
      this.setDefaultImage();
      // this.setState(state => {
      //   const anuncios = state.anuncios.concat(result.data)
      //   return {
      //     anuncios,
      //     loading: false
      //   }
      // })
      this.setState({ loading: false }, () => this.props.history.push("/"))
    })
    .catch(error => console.log(error.response.data))
  }

  render() {
    console.log(this.state)
    if(!this.state.loading){
      return (
        <section className="cadastro-item-wrapper">
          <div className="cadastro-item">
            <input type="text" value={this.state.titulo} placeholder="Titulo do anúncio" onChange={e => this.setState({ titulo: e.target.value })}/>
            <textarea type="text" rows="3" cols="33" value={this.state.descricao} placeholder="Descrição" onChange={e => this.setState({ descricao: e.target.value })}/>
            <input type="number" value={this.state.cep} placeholder="CEP" onChange={e => this.setState({ cep: e.target.value })}/>
            <input type="text" value={this.state.cidade} placeholder="Cidade" onChange={e => this.setState({ cidade: e.target.value })}/>
            <input type="text" value={this.state.bairro} placeholder="Bairro" onChange={e => this.setState({ bairro: e.target.value })}/>
            <input type="number" value={this.state.telefone} placeholder="Telefone com DDD" onChange={e => this.setState({ telefone: e.target.value })}/>
            <select type="text" value={this.state.categoria} placeholder="Categoria" onChange={e => this.setState({ categoria: e.target.value })}>
              <option>Selecione uma opção</option>
              <option>Serviços</option>
              <option>Vagas</option>
              <option>Currículos</option>
            </select>
            <input type="file" placeholder="imagem" name="imagem" onChange={(e) => this.uploadImage(e, 'multer')}/>
            <img src={this.state.multerImage} alt="upload" className="prov-img" />
            <button onClick={this.handleSubmit}>Cadastrar</button>
          </div>
        </section>
      );
    }else{
      return (
        <section className="cadastro-item-wrapper-loading">
          <img src={ loadingImg } alt="" />
        </section>
      )
    }
  }
}

export default withRouter(CadastroItem);