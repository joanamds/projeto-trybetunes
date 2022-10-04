import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { artistId, artistName, collectionId,
      collectionName, artworkUrl100 } = this.props;

    return (
      <div className={ collectionId }>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h1>
          { collectionName }
        </h1>
        <p className={ artistId }>
          { artistName }
        </p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistId: PropTypes.number,
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionId: PropTypes.number,
  collectionName: PropTypes.string,
}.isRequired;

export default AlbumCard;
