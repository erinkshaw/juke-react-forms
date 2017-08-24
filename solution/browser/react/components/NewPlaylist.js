import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewPlaylist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      dirty: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  handleChange(event) {
    console.log(this.state.input)
    this.setState({
      input: event.target.value,
      dirty: true
    })
  }

  handleSubmit(event){

    event.preventDefault()
    this.props.handlePlaylistSubmit(this.state.input)
    this.setState({
      input: '',
      dirty: false
    })
  }

  handleValidation() {
    return this.state.input.length < 1 || this.state.input.length > 16
  }

  render() {
    const bool = this.handleValidation()
    return (
    <div className="well">
      <form onSubmit={this.handleSubmit}className="form-horizontal">
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input onChange={this.handleChange}  value={this.state.input} className="form-control" type="text" />
                {
                  this.state.dirty && this.state.input.length === 0 ? <div className="alert alert-warning">Please enter a name</div> : null
                }
                {
                  this.state.dirty && this.state.input.length > 16 ? <div className="alert alert-warning">Name is too long</div> : null
                }
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              {<button id="createButton" disabled={bool} type="submit" className="btn btn-success">Create Playlist</button>}
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    )
  }
}
