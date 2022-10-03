import React, { Component } from 'react';
import Header from './Header';
import Loading from './Loading';

class Profile extends Component {
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
        <Header data-testid="link-to-profile" />
        <div data-testid="page-profile">
          {
            isLoading
              ? <Loading />
              : <h1>Profile</h1>
          }
        </div>
      </>
    );
  }
}

export default Profile;
