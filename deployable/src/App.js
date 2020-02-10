import React, {Component} from 'react';
import './App.scss';

import superagent from "superagent"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from './components/Header'
import Footer from './components/Footer'
import Content from './components/List'
import AddForm from './components/AddForm'
import Detail from './components/Detail'

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      albumData:[{name:"",artist:""}],
      
    }
    this.api = "http://138.68.246.193:8000/api/v1/"
    this.loadData()
    this.addAlbum = this.addAlbum.bind(this)
    this.renderDetail = this.renderDetail.bind(this)
    this.removeAlbum = this.removeAlbum.bind(this)
    this.updateAlbum = this.updateAlbum.bind(this)
  }


  // Load the Json file
  async loadData () {
    try {

      await superagent.get(this.api)
      .auth('stanley', 'Stan3ls42')
      .then(Response => {
        let data = JSON.parse(Response.text);
        data = data.map(album => {
          album.key =  this.hash(album.name)
          return album
        })
        this.setState({
          albumData:data
        })
      })
      .catch((error) => {
        console.log('error')
      })
    } catch (error) {
      console.error('Failed request')
    }
  }


  //Adds the values from the form to the app state
  addAlbum (formInfo) {
    superagent.post(this.api)
    .auth('stanley', 'Stan3ls42')
    .send({name:formInfo.name, artist:formInfo.artist, track_count:1, user:1})
    .then(res => {
      console.log('Sent New Album')
    })
    this.loadData()
  }


  // Update the an album in the state
  updateAlbum (event) {
    event.preventDefault()

    const formInfo = event.target
    console.log(formInfo)
    const album = this.state.albumData.find(album => {
      if (album.key === parseInt(formInfo.key.value)) {
        return album
      }
    })

    superagent.put(this.api + album.pk + '/')
    .auth('stanley', 'Stan3ls42')
    .type('form')
    // .set('Content-Type', 'application/json')
    .field({
      name:formInfo.name.value, 
      artist:formInfo.artist.value
    })
    .then(res => {
      console.log('Updated the Album')
    })
    this.loadData()

  }


  // Remove an album in the app state
  removeAlbum (event) {
    event.preventDefault()

    const album = this.state.albumData.find(album => {
      if (album.key === parseInt(event.target.value)) {
        return album
      }
    })

    superagent.del(this.api+album.pk)
    .auth('stanley', 'Stan3ls42')
    .send({pk:album.pk})
    .then(() => {
      this.loadData()
      console.log('Removed Album')
    })

  }


  // Used to create the album ID/key based on the title
  hash (title) {
    let sum = 0;
    for (var i = 0; i < title.length; i++) {
      sum += title.charCodeAt(i);
    }
    sum *= 9901
    return sum % 65536
  }


  // Used to render either the detail page
  renderDetail (props) {
    const albumID = parseInt(props.match.params.id);    
    const currentAlbum = this.state.albumData && this.state.albumData.find(album => album.key === albumID);

    if (currentAlbum) {
      return <Detail album={currentAlbum} onDelete={this.removeAlbum} update={this.updateAlbum}/>

    } else {
      return <Redirect to="/" />
    }
  }


  render() {
    let actionFunctions = {
      addValue:this.addAlbum
    }
    return (
      <div className="App">
        <Router>
          <Header/>
          <Switch>
            <Route path="/add">
              <AddForm addValue={this.addAlbum}/>
            </Route>
            <Route path="/detail/:id" render={this.renderDetail}>
            </Route>
            <Route path="/">
              <Content data={this.state.albumData} functions={actionFunctions}/>
            </Route>
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;
