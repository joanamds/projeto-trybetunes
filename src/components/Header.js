import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <>
        <Link
          to="search"
        >
          Procurar
        </Link>
        <Link
          to="favorites"
        >
          Favoritas
        </Link>
        <Link
          to="profile"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </>
    );
  }
}

export default Header;
