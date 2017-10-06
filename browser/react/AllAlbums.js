import React from 'react'
import axios from 'axios'
import SingleAlbum from './SingleAlbum'

export default class AllAlbums extends React.Component {

  render () {
  return ( <div className="col-xs-10">
  <h3>Albums</h3>
  <div className="row">
    {
      this.props.albums.map(album => (
      <div className="col-xs-4" key={album.id}>
      <a className="thumbnail" href="#"
      onClick={() => this.props.handleClick(album.id)}
      >
        <img src={album.imageUrl} />
        <div className="caption">
          <h5>
            <span>{album.name}</span>
          </h5>
          <small>{album.songs.length}</small>
        </div>
      </a>
    </div>
    ))
  }
  </div>
  </div>
  )
  }
}

{
  // `api/albums/${album.id}`
}