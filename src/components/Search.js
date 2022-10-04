import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      searchItem: '',
    };
  }

  onSearchChange = (event) => {
    const searchValue = event.target.value;
    this.setState({
      searchItem: searchValue,
    }, () => this.validateSearch());
  };

  validateSearch = () => {
    const { searchItem } = this.state;
    const minLength = 2;
    const validSearch = searchItem.length >= minLength;
    this.setState({
      isDisabled: !validSearch,
    });
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header data-testid="header-component" />
        <input
          data-testid="search-artist-input"
          type="text"
          placeholder="Nome do Artista"
          onChange={ this.onSearchChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isDisabled }
        >
          Procurar
        </button>
      </div>
    );
  }
}

export default Search;
