import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from '../../services/api'
import './sign-up.css'

class SignUp extends Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    error: "",
    loading: false
  };

  handleSignUp = async e => {
    e.preventDefault();
    this.setState({ loading: true })
    const { nome, email, senha } = this.state;
    if (!nome || !email || !senha) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/auth/registro", { nome, email, senha });
        this.props.history.push("/login");
        this.setState({ loading: false })
      } catch (err) {
        this.setState({ loading: false })
        console.log(err.response.data);
        this.setState({ error: err.response.data.erro });
      }
    }
  }

  render() {
    if(!this.state.loading){
      return (
        <section className="form-cadastro">
          <form onSubmit={this.handleSignUp} className="form-cadastro-wrapper">
            <input type="text" placeholder="Nome de usuário" onChange={e => this.setState({ nome: e.target.value })} required/>
            <input type="email" placeholder="Endereço de e-mail" onChange={e => this.setState({ email: e.target.value })} required/>
            <input type="password" placeholder="Senha" onChange={e => this.setState({ senha: e.target.value })} required/>
            {this.state.error && <p>{this.state.error}</p>}
            <button type="submit">Cadastrar grátis</button>
            <Link to="/">Fazer login</Link>
          </form>
        </section>
      );
    }else{
      return (
        <h1>loading...</h1>
      )
    }
  }
}

export default withRouter(SignUp)