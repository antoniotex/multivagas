import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import './header.css'
import { getName } from "../../services/auth";

class Header extends Component {
  state = {};

  render() {
    const imagemLogin = 'https://www.freeiconspng.com/uploads/user-login-icon-14.png'
    return (
      <section className="header">
        <h1>Easy</h1>
        <img src={ imagemLogin } alt="" onClick={() => alert(`Olá ${getName()}, fique a vontade!`)} />
      </section>
    );
  }
}

export default withRouter(Header);