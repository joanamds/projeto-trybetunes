import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      contentAlbum: '',
      isLoading: true,
      favoriteSong: '',
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.getAlbumSongs();
  }

  getAlbumSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      contentAlbum: response,
      isLoading: false,
    });
  };

  // getMusicId = (event) => {
  //   const { contentAlbum } = this.state;
  //   const value = event.target.parentNode.firstChild.innerText;
  //   const filterTrack = contentAlbum.find((track) => track.trackName === value);
  //   this.setState({
  //     favoriteSong: filterTrack.trackId,
  //   });
  // };

  getFavoriteSong = async () => {
    const { favoriteSong } = this.state;
    this.setState(
      { isLoading: true },
      async () => {
        await addSong(favoriteSong);
        this.setState({
          isLoading: false,
          isFavorite: true,
        });
      },
    );
  };

  render() {
    const { contentAlbum, isLoading, isFavorite } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <img
          src={ contentAlbum[0].artworkUrl100 }
          alt={ contentAlbum[0].artistName }
        />
        <h1 data-testid="album-name">
          { contentAlbum[0].collectionName }
        </h1>
        <h2 data-testid="artist-name">
          { contentAlbum[0].artistName }
        </h2>
        <div className="content-album">
          { contentAlbum.map((track, index) => {
            if (index === 0) {
              return <p />;
            }

            return (
              <MusicCard
                key={ track.trackId }
                previewUrl={ track.previewUrl }
                trackName={ track.trackName }
                trackId={ track.trackId }
                checked={ isFavorite }
                onFavoriteChange={ this.getFavoriteSong }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
