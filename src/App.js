
import NavBar from './components/NavBar';
import News from './components/News';
import './App.css';

import React, { Component } from 'react'
export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar title='Title' deccription = 'mydescription'/>
        <News/>

      </div>
    )
  }
}

