import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class AddValue extends Component {
  

  constructor (props) {
    super(props)
    this.state = {
      name:"",
      artist:"",
      formSubmitted:false
    }
    this.submitForm = this.submitForm.bind(this);
    this.formChange = this.formChange.bind(this);
  }

  // Send the saved data to the parent
  submitForm (event) {
    event.preventDefault();
    this.props.addValue(this.state);
    
    this.setState({
      name:"",
      artist:"",
    })
    this.setState({
      formSubmitted:true
    })
    
    console.log('Ready To Redirect', this.state.formSubmitted)
  }

  // Save the changes to the form
  formChange (event) {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({
      [name]:value
    })
  }

  // Display the two buttons for the input form
  render () {
    if (this.state.formSubmitted === true) {
      return <Redirect to="/"/>
    }
    return(
      <form onSubmit={this.submitForm}>
        <label>Album Name</label>
        <input name="name" type="TextField" onChange={this.formChange} value={this.state.album} required={true} />
        <label>Band Name</label>
        <input name="artist" type="TextField" onChange={this.formChange} value={this.state.band} required={true} />
        <button>Submit</button>
      </form>
    )
  }
}

export default AddValue