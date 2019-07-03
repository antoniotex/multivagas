import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from '../../services/api'
import './feed.css'
import loadingImg from '../../assets/gear.svg'

class Feed extends Component {
  state = {
    anuncios: [],
    menuOpen: false,
    imagens: '',
    loading: false
  };

  componentDidMount(){
    this.setState({ loading: true })
    const termo = this.props.location.pathname.slice(6)
    if(termo){
      const busca = {
        termo: termo
      }
      api.get('/api/anuncios/busca', { params: busca })
      .then(async result => {
        await result.data.map(item => {
          const base64Flag = `data:${item.dadosIMG.contentType};base64,`
          const imageStr = this.arrayBufferToBase64(item.dadosIMG.data.data)
          item.dadosIMG = base64Flag + imageStr
          return item
        })
        await this.setState({ anuncios: result.data, loading: false })
        return result.data
      })
      return
    }else{
      api.get('/api/anuncios')
      .then(async result => {
        await result.data.map(item => {
          const base64Flag = `data:${item.dadosIMG.contentType};base64,`
          const imageStr = this.arrayBufferToBase64(item.dadosIMG.data.data)
          item.dadosIMG = base64Flag + imageStr
          return item
        })
        await this.setState({ anuncios: result.data, loading: false })
        return result.data
      })
    }
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
    const { loading, anuncios } = this.state
    const termo = this.props.location.pathname.slice(6)
    if(!loading){
      return (
        <section className="feed">

          <h1>Feed de Anúncios</h1>
          <Link to="/"><p>Voltar para Home</p></Link>
          { termo ? <p>{`Aqui está sua pesquisa para '${termo}' `}</p> : '' }
          { anuncios.length > 0 ? '' : 'Não encontramos resultados para sua pesquisa, tente outro termo' }
          { anuncios.length > 0 && this.state.anuncios.map((item, index) => {
            return (
              <Link key={index} to={ `/anuncio/${item.id}` }>
                <div className="feed-anuncio">
                  <div className="feed-img">
                    <img src={ item.dadosIMG } alt="Imagem incluida no anuncio" />
                  </div>
                  <div className="feed-info">
                    <span>{item.titulo}</span>
                    <p>{ item.bairro }, { item.cidade }</p>
                    <p>{item.categoria}</p>
                  </div>
                </div>
              </Link> 
            )
          }) 
        }
        </section>
      );
    }else{
      return (
        <section className="loading-style">
          <img src={ loadingImg } alt=""/>
        </section>
      )
    }
  }
}

export default withRouter(Feed);