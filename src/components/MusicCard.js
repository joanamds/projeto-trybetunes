import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { previewUrl, trackName, trackId,
      onFavoriteChange, isFavorite } = this.props;
    return (
      <div key={ trackId }>
        <p>
          { trackName }
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          onChange={ onFavoriteChange }
          checked={ isFavorite }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  onFavoriteChange: PropTypes.func,
  checked: PropTypes.bool,
}.isRequired;

export default MusicCard;
