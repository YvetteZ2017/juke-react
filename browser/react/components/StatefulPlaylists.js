import React, { Component } from 'react';
import axios from 'axios';
import Main from './Main';

export default class StatefulPlaylists extends Component {

  constructor () {
    super();
    this.state = {
      playlists: []
    };

    this.addPlaylist = this.addPlaylist.bind(this);
  }

  componentDidMount () {
    axios.get('/api/playlists')
      .then(res => res.data)
      .then(playlists => this.setState({ playlists }));
  }

  addPlaylist (name) {
    axios.post('/api/playlists', { name })
      .then(res => res.data)
      .then(playlist => {
        console.log(playlist)
        this.setState({ playlists: [...this.state.playlists, playlist] })
      });
  }

  render () {

    const playlists = this.state.playlists;
    const addPlaylist = this.addPlaylist;

    return (
      <Main playlists={playlists} addPlaylist={addPlaylist} />
    );
  }
}
