import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import axios from 'axios';
import SinglePlaylist from './SinglePlaylist'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: []
    }
    this.handlePlaylistSubmit = this.handlePlaylistSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('/api/playlists')
    .then(res => res.data)
    .then(playlists => {
      this.setState({playlists})
    })
  }

  handlePlaylistSubmit(playlistName) {
    axios.post('/api/playlists', { name: playlistName })
    .then(res => res.data)
    .then(result => {
      console.log(result) // response json from the server!
    });
  }

  render () {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={this.state.playlists} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route path="/NewPlaylist" render={() => <NewPlaylist handlePlaylistSubmit={this.handlePlaylistSubmit} />} />
              <Route path="/playlists/:playlistId" component={SinglePlaylist} />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
