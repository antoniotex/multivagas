import React, { Component } from "react";
import { Link, withRouter, Switch, Route } from "react-router-dom";
import { logout } from "../../services/auth";
import Header from '../../components/header/header'
import MenuLateral from '../../components/menu-lateral/menu-lateral'
import CadastroItem from '../../components/cadastro-item/cadastro-item'

class Home extends Component {
  state = {};

  render() {
    return (
      <section>
        <MenuLateral/>
        <Header />
        <Switch>
          <Route path="/" exact component={ () => <h1>Home</h1> } />
          <Route path="/cadastro" component={ CadastroItem } />
          <Route path="/feed" component={ () => <h1>Feed</h1> } />
        </Switch>
      </section>
    );
  }
}

export default withRouter(Home);