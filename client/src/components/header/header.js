import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout } from '../../services/auth';
import './header.css'

class Header extends Component {
  state = {};

  render() {
    const imagemLogin = 'https://www.freeiconspng.com/uploads/user-login-icon-14.png'
    return (
      <section className="header">
        <h1>Easy</h1>
        <img src={ imagemLogin } />
      </section>
    );
  }
}

export default withRouter(Header);