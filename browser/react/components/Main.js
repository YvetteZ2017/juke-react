import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import StatefulAlbums from './StatefulAlbums';
import Album from './Album';
import Artists from './Artists';
import Artist from './Artist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import Playlist from './Playlist';
import { convertAlbum, convertAlbums } from '../utils';

export default class Main extends Component {

  render () {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar deselectAlbum={this.deselectAlbum} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={Album} />
              <Route exact path="/artists" component={Artists} />
              <Route path="/artists/:artistId" component={Artist} />
              <Route path="/new-playlist" component={NewPlaylist} />
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
