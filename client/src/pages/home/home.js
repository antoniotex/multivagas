import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import './home.css'
import Header from '../../components/header/header'
import MenuLateral from '../../components/menu-lateral/menu-lateral'
import Feed from '../../components/feed/feed'

class Home extends Component {
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
        <MenuLateral/>
        <Header />
        <div className="home-search">
          <input placeholder="O que você precisa?" onChange={e => this.setState({termo: e.target.value})}/>
          <Link to={ `/feed/${termo}` }><button>Buscar</button></Link>
        </div>
        <div className="home-feed-button">
          <Link to="/feed"><button>Ir para o Feed</button></Link>
        </div>
        <Feed />
      </section>
    )

  }
}

export default withRouter(Home);