import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from '../../services/api'
import './feed.css'

class Feed extends Component {
  state = {
    anuncios: [],
    menuOpen: false,
    imagens: ''
  };

  componentDidMount(){
    api.get('/api/anuncios')
    .then(async result => {
      await result.data.map(item => {
        const base64Flag = `data:${item.dadosIMG.contentType};base64,`
        const imageStr = this.arrayBufferToBase64(item.dadosIMG.data.data)
        item.dadosIMG = base64Flag + imageStr
      })
      await this.setState({ anuncios: result.data })
    })
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render() {
    if(this.state.anuncios.length > 0){
      return (
        <section className="feed">

          <h1>Anuncios</h1>
          {
            this.state.anuncios.map((item, index) => {
            return (
              <div className="feed-anuncio" key={index}>
                <div className="feed-img">
                  <img src={ item.dadosIMG } alt="Imagem incluida no anuncio" />
                </div>
                <div className="feed-info">
                  <span>{item.titulo}</span>
                  <p>{item.descricao}</p>
                  <p>{item.categoria}</p>
                </div>
              </div>
            )
          }) 
        }
        </section>
      );
    }else{
      return (
        <div className="App"><h1>Loading...</h1></div>
      )
    }
  }
}

export default withRouter(Feed);