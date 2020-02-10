import React from "react";
import {Link} from "react-router-dom";

export default () => {
  return (
  <header>
    <h1>Header</h1>
    <nav>
      <h4>Nav Bar</h4>
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/add" >Add Album</Link></li>
      </ul>
    </nav>
  </header>
  )
}