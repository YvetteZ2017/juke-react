import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Bluebird from 'bluebird';
import axios from 'axios';
import Albums from './Albums';
import Songs from './Songs';
import { convertAlbums, convertSong } from '../utils';

class Artist extends React.Component {

  constructor () {
    super();
    this.state = {
      artist: {}
    };
  }

  fetchArtist (artistId) {
    const mainPath = `/api/artists/${artistId}`;
    const paths = [mainPath, `${mainPath}/albums`, `${mainPath}/songs`];
    Bluebird
      .map(paths, path => axios.get(path))
      .map(res => res.data)
      .spread((artist, albums, songs) => {
        artist.albums = convertAlbums(albums);
        artist.songs = songs.map(convertSong);
        this.setState({ artist });
      });
  }

  componentDidMount () {
    const artistId = this.props.match.params.artistId;
    this.fetchArtist(artistId);
  }

  componentWillReceiveProps (nextProps) {
    const nextArtistId = nextProps.match.params.artistId;
    const currentArtistId = this.props.match.params.artistId;
    if (nextArtistId !== currentArtistId)
      this.fetchArtist(nextArtistId);
  }

  render () {

    const artist = this.state.artist;
    const albums = artist.albums || [];
    const songs = artist.songs || [];

    return (
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${artist.id}/songs`}>SONGS</Link></li>
        </ul>
        <Switch>
          <Route path={`/artists/${artist.id}/albums`} render={() => (
            <Albums artistId={artist.id} />
          )} />
          <Route path={`/artists/${artist.id}/songs`} render={() => (
            <Songs songs={songs} />
          )} />
        </Switch>
      </div>
    );
  }
}

export default Artist;

