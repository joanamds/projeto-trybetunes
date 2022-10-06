import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginItem: '',
      isLoading: false,
      isDisabled: true,
    };
  }

  onLoginChange = (event) => {
    const loginValue = event.target.value;
    this.setState({
      loginItem: loginValue,
    }, () => this.validateLogin());
  };

  validateLogin = () => {
    const { loginItem } = this.state;
    const minLength = 3;
    const validLogin = loginItem.length >= minLength;
    this.setState({
      isDisabled: !validLogin,
    });
  };

  onButtonClick = async () => {
    const { loginItem } = this.state;
    const { history: { push } } = this.props;
    this.setState(
      { isLoading: true },
      async () => {
        const response = await createUser({ name: loginItem });
        const { name } = response;
        this.setState({
          loginItem: name,
          isLoading: false,
        }, () => push('/search'));
      },
    );
  };

  render() {
    const { isLoading, isDisabled } = this.state;
    if (isLoading) return <Loading />;
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
          type="button"
          onClick={ this.onButtonClick }
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
