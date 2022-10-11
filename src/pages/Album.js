import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/Album.css';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      contentAlbum: [],
      isLoading: true,
      favoritesList: [],
    };
  }

  async componentDidMount() {
    await this.getAlbumSongs();
    await this.getFavoritesSaved();
  }

  getAlbumSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      contentAlbum: response,
      isLoading: false,
    });
  };

  getFavorite = async (event) => {
    this.setState({ isLoading: true });
    const { contentAlbum } = this.state;
    const { target } = event;
    const { checked, name } = target;
    const findTrack = contentAlbum.find((track) => track.trackName === name);
    if (checked) {
      await addSong(findTrack);
    } else {
      await removeSong(findTrack);
    }
    this.getFavoritesSaved();
  };

  getFavoritesSaved = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoritesList: favorites,
    });
  };

  isChecked = (trackId) => {
    const { favoritesList } = this.state;
    return favoritesList.some((music) => music.trackId === trackId);
  };

  render() {
    const { contentAlbum, isLoading } = this.state;
    return (
      <>
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <div data-testid="page-album">
                <div className="album-info">
                  <img
                    src={ contentAlbum[0].artworkUrl100 }
                    alt={ contentAlbum[0].artistName }
                  />
                  <h2 data-testid="album-name">
                    { contentAlbum[0].collectionName }
                  </h2>
                  <h3 data-testid="artist-name">
                    { contentAlbum[0].artistName }
                  </h3>
                  <div className="content-album">
                    { contentAlbum.map((track, index) => (
                      index !== 0
                      && (
                        <MusicCard
                          key={ track.trackId }
                          previewUrl={ track.previewUrl }
                          trackName={ track.trackName }
                          trackId={ track.trackId }
                          onFavoriteChange={ this.getFavorite }
                          isFavorite={ this.isChecked(track.trackId) }
                        />
                      )
                    ))}
                  </div>
                </div>
              </div>
            )
        }
      </>
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
