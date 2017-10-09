import React from 'react'
import axios from 'axios'

export default class SingleAlbum extends React.Component {
  render() {
    console.log('WE ARE IN SINGLE ALBUM')
    const { album } = this.props
    return (
      <div className="album col-xs-10">
      <div>
        <h3>{album.name}</h3>
        <img src={album.imageUrl} className="img-thumbnail" />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Artists</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {album.songs.map(song => (
            <tr key={song.id} className={+this.props.currentSong === +song.id ? 'active' : ""}>
              <td>
                <button className="btn btn-default btn-xs">
                  <span className={+this.props.currentSong === +song.id ? "" : "glyphicon glyphicon-play"}
                  onClick={ () => this.props.start(song.audioUrl) }
                  >
                  </span>
                </button>
              </td>
              <td>{song.name}</td>
              <td>{song.artists[0].name}</td>
              <td>{song.genre}</td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    )
  }
}