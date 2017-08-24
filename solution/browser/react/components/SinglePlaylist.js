import React, { Component }  from 'react';
import Songs from './Songs'
import axios from 'axios'
import AddSongForm from './AddSongForm'



export default class SinglePlaylist extends Component {
  constructor (props) {
    super (props)
    this.state = {
      playlist: {
        name: '',
        songs: []
      }
    }
  }


  componentDidMount () {
    const playlistId = this.props.match.params.playlistId
    axios.get(`api/playlists/${playlistId}`)
    .then(res => res.data)
    .then(playlist => {
      this.setState({playlist})
    })
  }

  componentWillReceiveProps (nextProps) {
    const nextPlaylistId = nextProps.match.params.playlistId;
    const currentPlaylistId = this.props.match.params.playlistId;
    if (nextPlaylistId !== currentPlaylistId) {
      axios.get(`/api/playlists/${nextPlaylistId}`)
        .then(res => res.data)
        .then(playlist => {
          // playlist.songs = playlist.songs.map(convertSong); // optional, for audio
          this.setState({ playlist: playlist });
        });
      }
  }

  render() {
    const playlist = this.state.playlist
    return (
      <div>
        <h3>{ playlist.name }</h3>
          <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
          { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
        <hr />
        <AddSongForm />
    </div>
    )
  }
}
