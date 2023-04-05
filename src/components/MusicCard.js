import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import '../styles/FavoriteIcon.css';

class MusicCard extends Component {
  render() {
    const { previewUrl, trackName, trackId,
      onFavoriteChange, isFavorite } = this.props;
    return (
      <div
        className="music-card"
        key={ trackId }
      >
        <p>
          { trackName }
        </p>
        <div className="audio-favorite">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
          <label htmlFor={ trackId }>
            <input
              key={ trackId }
              name={ trackName }
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              onChange={ onFavoriteChange }
              checked={ isFavorite }
              style={ { display: 'none' } }
            />
            { isFavorite
              ? <FaHeart className="icon" />
              : <FaRegHeart className="icon" />}
          </label>
        </div>
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
