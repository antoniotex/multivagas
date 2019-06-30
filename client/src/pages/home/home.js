import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../services/auth";
import Header from '../../components/header/header'
import MenuLateral from '../../components/menu-lateral/menu-lateral'

class Home extends Component {
  state = {};

  render() {
    return (
      <section>
        <MenuLateral/>
        <Header />
        <h1>App</h1>
        <Link to='/' onClick={ logout }>Sair</Link>
      </section>
    );
  }
}

export default withRouter(Home);