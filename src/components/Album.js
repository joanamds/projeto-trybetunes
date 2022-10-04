import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      contentAlbum: '',
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
    });
  };

  render() {
    const { contentAlbum } = this.state;
    const { collectionName, artistName } = contentAlbum;
    console.log(contentAlbum);
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="album-name">
          { collectionName }
        </h1>
        <h2>
          { artistName }
        </h2>
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
