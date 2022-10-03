import React, { Component } from 'react';
import Header from './Header';

class ProfileEdit extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <h1>ProfileEdit</h1>
        </div>
      </>
    );
  }
}

export default ProfileEdit;
