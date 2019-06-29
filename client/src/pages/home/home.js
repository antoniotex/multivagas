import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../services/auth";

class Home extends Component {
  state = {};

  render() {
    return (
      <section>
        <h1>App</h1>
        <Link to='/' onClick={ logout }>Sair</Link>
      </section>
    );
  }
}

export default withRouter(Home);