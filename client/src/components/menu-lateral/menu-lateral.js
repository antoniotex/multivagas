import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../services/auth";
import Header from '../../components/header/header'
import './menu-lateral.css'

class MenuLateral extends Component {
  state = {
    menuOpen: false
  };

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render() {
    return (
      <section className={`menu-lateral-wrapper ${this.state.menuOpen ? 'menu-open' : ''}`} onClick={this.toggleMenu}>
        <div className="menu-lateral">
          <ul className="menu">
            <li><Link to="/feed">Feed</Link></li>
            <li><Link to="/cadastro">Cadastrar Serviço</Link></li>
            <li>Mensagens</li>
            <li>Sobre o Aplicativo</li>
            <li>FAQ</li>
            <li><Link to="/" onClick={ logout }>Sair</Link></li>
          </ul>
        </div>
        <div className={`menu-toggle-button ${this.state.menuOpen ? 'menu-toggle-button-open' : ''}`}>
          <span onClick={this.toggleMenu} className={this.state.menuOpen ? 'rotate-hamburguer hamburguer-open' : ''}></span>
        </div>
      </section>
    );
  }
}

export default withRouter(MenuLateral);