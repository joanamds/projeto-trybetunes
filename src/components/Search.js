import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';
import AlbumCard from './AlbumCard';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      searchItem: '',
      isLoading: false,
      albumsList: [],
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

  onSearchClick = async () => {
    const { searchItem } = this.state;
    this.setState(
      { isLoading: true },
      async () => {
        const response = await searchAlbumsAPI(searchItem);
        const { artistName } = response;
        this.setState({
          searchItem: artistName,
          isLoading: false,
          albumsList: response,
        });
        console.log(response);
      },
    );
  };

  render() {
    const { isDisabled, isLoading, albumsList } = this.state;
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
          onClick={ this.onSearchClick }
        >
          Procurar
        </button>
        <p>
          {
            isLoading
              ? <Loading />
              : (albumsList.map((album) => (
                <AlbumCard
                  key={ album.collectionId }
                  artistId={ album.artistId }
                  artistName={ album.artistName }
                  artworkUrl100={ album.artworkUrl100 }
                  collectionId={ album.collectionId }
                  collectionName={ album.collectionName }
                />
              )))
          }
        </p>
      </div>
    );
  }
}

export default Search;
