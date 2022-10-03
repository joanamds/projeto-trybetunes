import React, { Component } from 'react';
import Header from './Header';
import Loading from './Loading';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {
            isLoading
              ? <Loading />
              : <h1>Favorites</h1>
          }
        </div>
      </>
    );
  }
}

export default Favorites;
