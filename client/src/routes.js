import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import SignUp from './pages/sign-up/sign-up.js';
import SignIn from "./pages/sign-in/sign-in.js";
import Home from './pages/home/home.js'
import CadastroItem from './components/cadastro-item/cadastro-item'
import Anuncio from './components/anuncio/anuncio'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/anuncio/:id" component={ Anuncio } />
      <PrivateRoute path="/cadastro" component={ CadastroItem } />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;