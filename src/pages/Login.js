import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Login.css';

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
        <div className="login-box">
          <h2>Login</h2>
          <input
            className="login-input"
            data-testid="login-name-input"
            placeholder="Nome do usuário"
            onChange={ this.onLoginChange }
          />
          <button
            className="button-login"
            data-testid="login-submit-button"
            type="button"
            onClick={ this.onButtonClick }
            disabled={ isDisabled }
          >
            <h3>Entrar</h3>
          </button>
        </div>
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
