import React, { Component } from "react";
import { Link, withRouter, Switch, Route } from "react-router-dom";
import './home.css'
import Header from '../../components/header/header'
import MenuLateral from '../../components/menu-lateral/menu-lateral'
import CadastroItem from '../../components/cadastro-item/cadastro-item'
import Feed from '../../components/feed/feed'
import Anuncio from '../../components/anuncio/anuncio'
import lupa from '../../assets/magnifier.svg'
import uerj from '../../assets/uerj_map.jpg'

class HomePage extends Component {
  state = {
    termo: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render(){
    const { termo } = this.state
    return (
      <section className="home-page">
        <div className="home-search">
          <input placeholder="O que você precisa?" onChange={e => this.setState({termo: e.target.value})}/>
          <Link to={ `/feed/${termo}` }><button><img src={ lupa } alt="" /></button></Link>
        </div>
        <div className="home-mapa">
          <h2>Você está aqui:</h2>
          <img src={ uerj } alt="" />
        </div>
        <div className="home-feed-button">
          <Link to="/feed"><button>Ir para o Feed</button></Link>
        </div>
      </section>
    )

  }
}

class Home extends Component {
  render() {
    return (
      <section className="home">
        <MenuLateral/>
        <Header />
        <Switch>
          <Route path="/" exact component={ HomePage } />
          <Route path="/cadastro" component={ CadastroItem } />
          <Route path="/feed" component={ Feed } />
          <Route path="/feed/:termo" component={ Feed } />
          <Route path="/anuncio/:id" component={ Anuncio } />
        </Switch>
      </section>
    );
  }
}

export default withRouter(Home);