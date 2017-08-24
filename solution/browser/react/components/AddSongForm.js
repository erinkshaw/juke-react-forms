import React, { Component } from 'react';
import axios from 'axios';

export default class AddSongForm extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      input: {},
      songs: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/songs')
    .then(res => res.data)
    .then(songs => {
      this.setState({songs})
    })
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    })
    console.log(this.state.input)
  }

  // handleSubmit() {

  // }

  render() {
    return (
    <div className="well">
    <form className="form-horizontal" noValidate name="songSelect">
      <fieldset>
        <legend>Add to Playlist</legend>
        <div className="form-group">
          <label htmlFor="song" className="col-xs-2 control-label">Song</label>
          <div className="col-xs-10">
            <select className="form-control" name="song" onChange={this.handleChange}>
              {this.state.songs.map( (song) => {
                return (
                  <option key={song.id} value={song}>{song.name}</option>
                  )
              })  }
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-10 col-xs-offset-2">
            <button type="submit" className="btn btn-success">Add Song</button>
          </div>
        </div>
      </fieldset>
    </form>
    </div>
    )
  }
}
