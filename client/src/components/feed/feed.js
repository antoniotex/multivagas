import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../services/auth";
import Header from '../../components/header/header'
import './menu-lateral.css'

class Feed extends Component {
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
      <section className="feed">
        Feed
      </section>
    );
  }
}

export default withRouter(Feed);