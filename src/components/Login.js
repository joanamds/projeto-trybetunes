import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
// import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginItem: '',
    };
  }

  onLoginChange = (event) => {
    const loginValue = event.target.value;
    this.setState({
      loginItem: loginValue,
    });
  };

  validateLogin = () => {
    const { loginItem } = this.state;
    const minLength = 3;
    const validLogin = loginItem.length >= minLength;
    return validLogin;
  };

  render() {
    const { loginItem } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <input
          data-testid="login-name-input"
          placeholder="Nome do usuário"
          onChange={ this.onLoginChange }
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          onClick={ createUser({ name: loginItem }) }
          disabled={ !this.validateLogin() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
