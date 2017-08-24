import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewPlaylist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  handleChange(event) {
    console.log(this.state.input)
    this.handleValidation()
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    console.log(this.state.input)
    this.setState({
      input: ''
    })
    // this.props.addComment(this.props.species, this.props.id, this.state.comment)
    // this.setState({
    //   comment: ''
    // })
  }

  handleValidation() {
    const button = document.getElementById('createButton')
    this.state.input < 0 || this.state.input > 16 ? button.disabled = true :  button.disabled = false
  }

  render() {
    return (
    <div className="well">
      <form onSubmit={this.handleSubmit}className="form-horizontal">
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input onChange={this.handleChange}  value={this.state.input} className="form-control" type="text" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button id="createButton" disabled="true" type="submit" className="btn btn-success">Create Playlist</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    )
  }
}
