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

  removeFavorite = async (event) => {
    this.setState({ isLoading: true });
    const { favoritesList } = this.state;
    const { target } = event;
    const { name } = target;
    const findTrack = favoritesList.find((track) => track.trackName === name);
    await removeSong(findTrack);
    const updateList = favoritesList
      .filter((music) => music.trackName !== name);
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
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <>
                <h1>Favorites</h1>
                <div className="content-favorites">
                  { favoritesList.map((track) => (
                    <MusicCard
                      key={ track.trackId }
                      previewUrl={ track.previewUrl }
                      trackName={ track.trackName }
                      trackId={ track.trackId }
                      isFavorite={ this.isChecked(track.trackId) }
                      onFavoriteChange={ this.removeFavorite }
                    />
                  ))}
                </div>
              </>
            )
        }
      </div>
    );
  }
}

export default Favorites;
