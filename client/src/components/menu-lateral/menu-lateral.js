import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../services/auth";
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
        <span onClick={this.toggleMenu} className={this.state.menuOpen ? 'rotate-hamburguer hamburguer-open' : ''}></span>
          <ul className="menu">
          <Link to="/"><li>Home</li></Link>
          <Link to="/feed"><li>Feed</li></Link>
          <Link to="/cadastro"><li>Cadastrar Serviço</li></Link>
            <li>Mensagens</li>
            <li>Sobre o Aplicativo</li>
            <li>FAQ</li>
            <Link to="/" onClick={ logout }><li>Sair</li></Link>
          </ul>
        </div>
      </section>
    );
  }
}

export default withRouter(MenuLateral);