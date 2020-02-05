import React from "react";
import {Link} from "react-router-dom";

export default (props) => {

  return (
    <header>
      <h1>Header</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}