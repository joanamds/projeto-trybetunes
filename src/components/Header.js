import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    const userAPI = await getUser();
    const { name } = userAPI;
    this.setState({
      isLoading: false,
      user: name,
    });
  };

  render() {
    const { isLoading, user } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header
        className="header-content"
        data-testid="header-component"
      >
        <p data-testid="header-user-name">
          Usuário:
          { user }
        </p>
        <Link
          className="header-link"
          to="/search"
          data-testid="link-to-search"
        >
          Procurar
        </Link>
        <Link
          className="header-link"
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favoritas
        </Link>
        <Link
          className="header-link"
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}

export default Header;
