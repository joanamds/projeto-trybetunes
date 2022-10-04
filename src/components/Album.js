import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      contentAlbum: '',
      isLoading: true,
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
    // console.log(contentAlbum);
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
          { contentAlbum.map((track, index) => {
            if (index === 0) {
              return <p />;
            }

            return (
              <MusicCard
                key={ track.trackId }
                previewUrl={ track.previewUrl }
                trackName={ track.trackName }
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
