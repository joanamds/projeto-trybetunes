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
      searchMessage: '',
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
    this.setState({ isLoading: true });
    const response = await searchAlbumsAPI(searchItem);
    this.setState({
      isLoading: false,
      albumsList: response,
      searchMessage: `Resultado de álbuns de: ${searchItem}`,
    });
  };

  render() {
    const { isDisabled, isLoading, albumsList, searchMessage } = this.state;
    if (isLoading) return <Loading />;
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
        <div className="album-list">
          {
            albumsList.length === 0
              ? <h2>Nenhum álbum foi encontrado</h2>
              : (
                <div>
                  <h3>{ searchMessage }</h3>
                  {
                    albumsList.map((album) => (
                      <AlbumCard
                        key={ album.collectionId }
                        artistId={ album.artistId }
                        artistName={ album.artistName }
                        artworkUrl100={ album.artworkUrl100 }
                        collectionId={ album.collectionId }
                        collectionName={ album.collectionName }
                      />
                    ))
                  }
                </div>)
          }
        </div>
      </div>
    );
  }
}

export default Search;
