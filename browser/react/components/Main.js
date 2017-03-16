import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Artists from '../components/Artists';
import Artist from '../components/Artist';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import NewPlaylist from '../components/NewPlaylist';

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
              <Route exact path="/albums" component={Albums} />
              <Route path="/albums/:albumId" component={Album} />
              <Route exact path="/artists" component={Artists} />
              <Route path="/artists/:artistId" component={Artist} />
              <Route path="/new-playlist" component={NewPlaylist} />
              <Route component={Albums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
