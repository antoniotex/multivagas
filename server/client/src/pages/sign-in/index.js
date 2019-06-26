import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

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
        console.log(response)
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        console.log('Erro: ', err.response.data)
        this.setState({
          error:
            err.response.data.erro
        });
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignIn}>
          {this.state.error && <p>{this.state.error}</p>}
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
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);