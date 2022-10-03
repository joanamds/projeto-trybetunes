import React, { Component } from 'react';
import Header from './Header';
import Loading from './Loading';

class Search extends Component {
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
        <div data-testid="page-search">
          {
            isLoading
              ? <Loading />
              : <h1>Search</h1>
          }
        </div>
      </>
    );
  }
}

export default Search;
