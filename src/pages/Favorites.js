import React, { Component } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      favoritesList: [],
    };
  }

  componentDidMount() {
    this.getFavoritesSaved();
    this.setState({
      isLoading: false,
    });
  }

  getFavoriteId = (event) => {
    const { favoritesList } = this.state;
    const value = event.target.parentNode.firstChild.innerText;
    const findTrack = favoritesList.find((track) => track.trackName === value);
    return this.removeFavorite(findTrack);
  };

  removeFavorite = async (findTrack) => {
    const { favoritesList } = this.state;
    this.setState({ isLoading: true });
    const updateList = favoritesList
      .filter((music) => music.trackId !== findTrack.trackId);
    await removeSong(findTrack);
    this.setState({
      isLoading: false,
      favoritesList: updateList,
    });
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
    const { isLoading, favoritesList } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        <div className="content-favorites">
          { favoritesList.map((track) => (
            <MusicCard
              key={ track.trackId }
              previewUrl={ track.previewUrl }
              trackName={ track.trackName }
              trackId={ track.trackId }
              isFavorite={ this.isChecked(track.trackId) }
              onFavoriteChange={ this.getFavoriteId }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
