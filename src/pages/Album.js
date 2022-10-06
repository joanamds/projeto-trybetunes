import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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
    this.setState({ isLoading: true });
    console.log(this.isChecked(findTrack.trackId));
    if (this.isChecked(findTrack.trackId)) {
      await removeSong(findTrack);
      this.setState({
        isLoading: false,
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
    const { favoritesList, contentAlbum } = this.state;
    const findMusic = contentAlbum.find((music) => music.trackId === trackId);
    const isFavorite = favoritesList.includes(findMusic);
    return isFavorite;
  };

  render() {
    const { contentAlbum, isLoading } = this.state;
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
