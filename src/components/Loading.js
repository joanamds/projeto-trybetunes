import React, { Component } from 'react';
import loading from '../images/loading-gif.gif';

class Loading extends Component {
  render() {
    return (
      <div align="center">
        <img src={ loading } alt="loading gif" width="100" />
      </div>
    );
  }
}

export default Loading;
