import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-profile">
        <Header data-testid="header-component" />
        <h1>Profile</h1>
        <Link to="edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
