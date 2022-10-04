import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { artistId, artistName, collectionId,
      collectionName, artworkUrl100 } = this.props;

    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h2>
          { collectionName }
        </h2>
        <p className={ artistId }>
          { artistName }
        </p>
      </Link>
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
