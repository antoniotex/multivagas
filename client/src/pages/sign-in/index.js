import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import './sign-in.css'

// import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";
import { login } from "../../services/auth";

// import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    senha: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, senha } = this.state;
    if (!email || !senha) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/auth/authenticate", { email, senha })
        login(response.data.token, response.data.usuario.nome);
        this.props.history.push("/");
      } catch (err) {
        this.setState({
          error:
            err.response.data.erro
        });
      }
    }
  };

  render() {
    const imagemLogin = 'https://www.freeiconspng.com/uploads/user-login-icon-14.png'
    return (
      <section className="form-login">
        <h1>Easy</h1>
        <form className="form-login-wrapper" onSubmit={this.handleSignIn}>
          <img src={ imagemLogin } alt=""/>
          <input type="email" placeholder="Endereço de e-mail" onChange={e => this.setState({ email: e.target.value })}/>
          <input type="password" placeholder="Senha" onChange={e => this.setState({ senha: e.target.value })} />
          <button type="submit">Entrar</button>
          {this.state.error && <p>{this.state.error}</p>}
          <Link to="/signup">Criar conta grátis</Link>
        </form>
      </section>
    );
  }
}

export default withRouter(SignIn);