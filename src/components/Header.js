import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { user }
        </p>
        <Link
          to="search"
          data-testid="link-to-search"
        >
          Procurar
        </Link>
        <Link
          to="favorites"
          data-testid="link-to-favorites"
        >
          Favoritas
        </Link>
        <Link
          to="profile"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}

export default Header;
