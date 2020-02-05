import React from "react";

import Form from "./Form"

export default props => {
  return (
    <>
    <ul>
      {props.data.map(value => makeListItem(value))}
    </ul>
    <Form/>
    </>
    )
}

function makeListItem(value) {
  return (
    <li>
      <h2>LI</h2>
    </li>
  )
}