import React, { Component } from "react";
import {Link} from "react-router-dom"

class Content extends Component {

  // creates the list of items in the API
  createList() {
    return (
      <ul>
        {this.props.data.map( info => {
          return(
            <li key={info.key ? info.key: 0}>
              <h3>{info.name}</h3>
              <h4>{info.artist}</h4>
              <Link to={`detail/${info.key}`} props={info}>Edit</Link>
            </li>
          )
        })}
      </ul>
    )
  }

  render () {
    console.log(this.props.data)
    return (
      <div>
        {this.createList()}
      </div>
    )
  }

}

export default Content;
