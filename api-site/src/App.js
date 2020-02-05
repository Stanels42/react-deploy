'use strict';
import React, { Component } from 'react';
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import './App.css';

import Header from "./components/Header"
import Footer from "./components/Footer"
import List from "./components/List"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      api:'url goes here',

    }
    this.getData();
  }
  

  async getData () {
    const importedData = await axios.get('data/info.json');
    console.log(importedData)
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header/>
          <Switch>
            <Route path="/">
              <List data={[1,2,3]}/>
            </Route>
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }
}
export default App;
