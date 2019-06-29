import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from '../../services/api'

// import Logo from "../../assets/airbnb-logo.svg";

// import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { nome, email, senha } = this.state;
    if (!nome || !email || !senha) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/auth/registro", { nome, email, senha });
        this.props.history.push("/login");
      } catch (err) {
        console.log(err.response.data);
        this.setState({ error: err.response.data.erro });
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignUp}>
          
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => this.setState({ nome: e.target.value })}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="senha"
            placeholder="Senha"
            onChange={e => this.setState({ senha: e.target.value })}
          />
          <button type="submit">Cadastrar grátis</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp)