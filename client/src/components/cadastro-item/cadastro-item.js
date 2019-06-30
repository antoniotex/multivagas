import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import './cadastro-item.css'

class CadastroItem extends Component {
  state = {
    nomeusuario: '',
    titulo: '',
    titulo: '',
    titulo: '',
    titulo: '',
    titulo: '',
    titulo: '',
    titulo: '',
  }

  render() {
    return (
      <section className="cadastro-item-wrapper">
        <form className="cadastro-item">
          <input type="text" placeholder="Titulo do anúncio" onChange={e => this.setState({ titulo: e.target.value })}/>
          <input type="text" placeholder="Descrição" onChange={e => this.setState({ descricao: e.target.value })}/>
          <input type="text" placeholder="CEP" onChange={e => this.setState({ cep: e.target.value })}/>
          <input type="text" placeholder="Cidade" onChange={e => this.setState({ cidade: e.target.value })}/>
          <input type="text" placeholder="Bairro" onChange={e => this.setState({ bairro: e.target.value })}/>
          <input type="text" placeholder="Telefone com DDD" onChange={e => this.setState({ telefone: e.target.value })}/>
          <input type="text" placeholder="Categoria" onChange={e => this.setState({ categoria: e.target.value })}/>
          <input type="text" placeholder="Cidade" onChange={e => this.setState({ nome: e.target.value })}/>
        </form>
      </section>
    );
  }
}

export default withRouter(CadastroItem);