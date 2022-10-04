import React, { Component } from 'react';
import Loading from './Loading';
import Header from './Header';

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
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
      </div>
    );
  }
}

export default Search;
