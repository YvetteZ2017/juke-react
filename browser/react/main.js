'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './Sidebar'
import Footer from './Footer'
import AllAlbums from './AllAlbums'
import SingleAlbum from './SingleAlbum'
import axios from 'axios';

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      albums: [],
      selectedAlbum: {},
      haveAlbum: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const toJson = response => response.data;
    const log = console.log.bind(console);
    const logError = console.error.bind(console);
    axios.get('api/albums')
    .then(toJson)
    // .then(log)
    .then(data => this.setState({albums: data}))
    .catch(logError)
  }

  handleClick (albumId) {
    const logError = console.error.bind(console);
    axios.get('/api/albums/' + albumId)
      .then(res => res.data)
      // .then(console.log)
      .then(album => {
        this.setState({selectedAlbum: album})
        this.setState({haveAlbum: true})
        console.log('state: ', this.state)
        // render(<SingleAlbum album={this.state.selectedAlbum}/>)
      })
      .catch(logError)
  }

  render() {
    return (
      <div id="main" className="container-fluid">
        <Sidebar />
        {this.haveAlbum ?
          (<SingleAlbum album={this.state.selectedAlbum} />)
          :
          (<AllAlbums albums={this.state.albums} handleClick={this.handleClick} />)
        }
        <Footer />
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
