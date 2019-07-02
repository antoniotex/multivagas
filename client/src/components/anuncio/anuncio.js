import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import moment from 'moment'
import api from '../../services/api'
import './anuncio.css'
import leftArrow from '../../assets/left-arrow.svg'
import loadingImg from '../../assets/gear.svg'

class Anuncio extends Component {
  state = {
    anuncio: [],
    loading: false
  };

  componentDidMount(){
    this.setState({ loading: true })
    const { match } = this.props
    api.get(`/api/anuncios/id/${match.params.id}`)
    .then(async result => {
      const base64Flag = `data:${result.data.dadosIMG.contentType};base64,`
      const imageStr = this.arrayBufferToBase64(result.data.dadosIMG.data.data)
      result.data.dadosIMG = base64Flag + imageStr
      await this.setState({ anuncio: result.data, loading: false })
    })
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  render() {
    moment.updateLocale('en', {
      relativeTime : {
          future: "em %s",
          past:   "%s atrás",
          s  : 'poucos segundos',
          ss : '%d segundos',
          m:  "1 minuto",
          mm: "%d minutos",
          h:  "uma hora",
          hh: "%d horas",
          d:  "um dia",
          dd: "%d dias",
          M:  "um mês",
          MM: "%d meses",
          y:  "um ano",
          yy: "%d anos"
        }
    });
    const { loading, anuncio } = this.state
    console.log(anuncio)
    if(!loading){
      return (
        <section className="anuncio">
        <div className="anuncio-img">
          <Link to="/feed"><img className="seta-voltar" src={ leftArrow } alt="" /></Link>
          <img src={ anuncio.dadosIMG } alt=""/>
        </div>
        <div className="anuncio-info">
          <span>{ anuncio.titulo }</span>
          <small>{`Categoria: ${anuncio.categoria}  |  Postado: ${moment(anuncio.data).fromNow()}` }</small>
          <p>{ anuncio.descricao }</p>
        </div>
        <hr/>
        <div className="anuncio-dados">
          <h3>Contato</h3>
          <p>Nome: { anuncio.nomeUsuario }</p>
          <p>Telefone: { anuncio.telefone }</p>
        </div>
        <hr/>
        <div className="anuncio-localizacao">
          <h3>Localização</h3>
          <p>CEP: { anuncio.cep }</p>
          <p>Bairro: { anuncio.bairro }</p>
          <p>Cidade: { anuncio.cidade }</p>
        </div>
        </section>
      );
    }else{
      return (
        <section className="loading-style">
          <img src={ loadingImg } alt="" />
        </section>
      )
    }
  }
}

export default withRouter(Anuncio);