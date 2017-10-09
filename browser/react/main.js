'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './Sidebar'
import Footer from './Footer'
import AllAlbums from './AllAlbums'
import SingleAlbum from './SingleAlbum'
import axios from 'axios';
const audio = document.createElement('audio');

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      albums: [],
      selectedAlbum: {},
      haveAlbum: false,
      playingSong: false,
      currentSong: -1
    }
    this.handleClick = this.handleClick.bind(this)
    this.deselectAlbum = this.deselectAlbum.bind(this)
    this.start = this.start.bind(this)
  }

  componentDidMount() {
    axios.get('api/albums')
    .then(res => res.data)
    .then(albums => this.setState({albums}))
    .catch(console.error)
  }

  handleClick (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => {
        this.setState({selectedAlbum: album, haveAlbum: true})
        console.log('State: ', this.state)
        return album
      })
      .catch(console.error)
  }

  deselectAlbum () {
    this.setState({selectedAlbum: {}, haveAlbum: false})
  }

  start (audioUrl, id) {
    this.setState({playingSong: true, currentSong: audioUrl.split('/')[3]})
    // .bind(this)
    console.log('starting song. state: ', this.state)
    audio.src = audioUrl
    audio.load()
    audio.play()
  }

  render() {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselect={this.deselectAlbum} />
        </div>
        <div className="album col-xs-10">      
          {
            this.state.haveAlbum ?
            <SingleAlbum album={this.state.selectedAlbum} start={this.start} playingSong={this.state.playingSong} currentSong={this.state.currentSong}/>
            :
            <AllAlbums albums={this.state.albums} handleClick={this.handleClick} />
          }
          {
            this.state.playingSong && <Footer playingSong={this.state.playingSong}/>
          }
        </div>
      </div>
    )
  }
}

// const fakeAlbums = [
//   {
//     name: 'Abbey Road',
//     id: 1,
//     imageUrl: 'http://fillmurray.com/300/300',
//     songs: [
//       {
//         id: 1,
//         name: 'Romeo & Juliette',
//         artists: [ 
//           { name: 'Bill' } 
//         ],
//         genre: 'Funk',
//         audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
//       }, 
//       {
//         id: 2,
//         name: 'White Rabbit',
//         artists: [
//           { name: 'Bill' }, 
//           { name: 'Alice' }
//         ],
//         genre: 'Fantasy',
//         audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
//       }, 
//       {
//         id: 3,
//         name: 'Lucy in the Sky with Diamonds',
//         artists: [ 
//           { name: 'Bob' } 
//         ],
//         genre: 'Space',
//         audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
//       }
//     ]
//   },
//   {
//     name: 'Yellow Submarine',
//     id: 2,
//     imageUrl: 'http://fillmurray.com/300/300',
//     songs: [
//       {
//         id: 4,
//         name: 'London Calling',
//         artists: [ 
//           { name: 'Bill' } 
//         ],
//         genre: 'Punk',
//         audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
//       }
//     ]
//   }
// ];
