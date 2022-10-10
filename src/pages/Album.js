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

  componentDidMount() {
    this.getAlbumSongs();
    this.getFavoritesSaved();
  }

  getAlbumSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      contentAlbum: response,
      isLoading: false,
    });
  };

  getMusicId = (event) => {
    const { contentAlbum } = this.state;
    const value = event.target.parentNode.firstChild.innerText;
    const findTrack = contentAlbum.find((track) => track.trackName === value);
    return this.getFavorite(findTrack);
  };

  getFavorite = async (findTrack) => {
    const { favoritesList } = this.state;
    this.setState({ isLoading: true });
    if (this.isChecked(findTrack.trackId)) {
      const updateList = favoritesList
        .filter((music) => music.trackId !== findTrack.trackId);
      await removeSong(findTrack);
      this.setState({
        isLoading: false,
        favoritesList: updateList,
      });
    } else {
      await addSong(findTrack);
      this.setState((prevState) => ({
        isLoading: false,
        favoritesList: [...prevState.favoritesList, findTrack],
      }));
    }
  };

  getFavoritesSaved = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      favoritesList: favorites,
    });
  };

  isChecked = (trackId) => {
    const { favoritesList } = this.state;
    const findMusic = favoritesList.some((music) => music.trackId === trackId);
    return findMusic;
  };

  render() {
    const { contentAlbum, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
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
                  isFavorite={ this.isChecked(track.trackId) }
                  onFavoriteChange={ this.getMusicId }
                />
              )
            ))}
          </div>
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
