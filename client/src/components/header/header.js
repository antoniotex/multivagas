import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import './header.css'

class Header extends Component {
  state = {};

  render() {
    return (
      <section className="header">
        <h1>Multivagas</h1>
      </section>
    );
  }
}

export default withRouter(Header);