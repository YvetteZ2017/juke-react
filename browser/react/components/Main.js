import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import StatefulAlbums from './StatefulAlbums';
import Album from './Album';
import StatefulArtists from './StatefulArtists';
import Artist from './Artist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import Playlist from './Playlist';

export default class Main extends Component {

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
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={playlists} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={Album} />
              <Route exact path="/artists" component={StatefulArtists} />
              <Route path="/artists/:artistId" component={Artist} />
              <Route path="/new-playlist" render={() => <NewPlaylist addPlaylist={addPlaylist} />} />
              <Route path="/playlists/:playlistId" component={Playlist} />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
