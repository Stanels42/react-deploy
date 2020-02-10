import React, {Component} from 'react';

class Detail extends Component{
  
  constructor(props) {
    super(props)
    this.state = {
      name:props.album.name,
      artist:props.album.artist
    }
    this.fieldChange = this.fieldChange.bind(this)
  }


  // Save the values in the field as the user types
  fieldChange(event) {
    event.preventDefault()

    const field = event.target

    this.setState({
      [field.name]:field.value
    })
  }

  render () {
    return (
      <div id="detail">
        <form onSubmit={this.props.update}>
          <input name="artist" onChange={this.fieldChange} type="textField" value={this.state.artist}/>
          <input name="name" onChange={this.fieldChange} type="textField" value={this.state.name}/>
          <button name="key" value={this.props.album.key}>Save</button>
        </form>
        <button onClick={this.props.onDelete} value={this.props.album.key}>Remove</button>
      </div>
    )
  }
}

export default Detail