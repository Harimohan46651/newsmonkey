
import NavBar from './components/NavBar';
import News from './components/News';
import './App.css';

import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"
import { Routes } from "react-router"

export default class App extends Component {
  apiKey= "8e6be48dd1384026baf1d0d130093c82"
  render() {
    return (
      <div>
        
        <Router>
        <NavBar/>
          <Routes>
          <Route exact path="/" element={<News key={'general'} pageSize={5}     apiKey={this.apiKey} country={'in'} category={'general'}/>}> </Route>
          <Route exact path="/business" element={<News key={'business'} pageSize={5}      apiKey={this.apiKey} country={'in'} category={'business'}/>}> </Route>
          <Route exact path="/entertainment" element={<News key={'entertainment'} pageSize={5}      apiKey={this.apiKey} country={'in'} category={'entertainment'}/>}> </Route>
          <Route exact path="/general" element={<News key={''} pageSize={5}      apiKey={this.apiKey} country={'in'} category={'general'}/>}> </Route>
          <Route exact path="/health" element={<News key={'health'} pageSize={5}      apiKey={this.apiKey} country={'in'} category={'health'}/>}> </Route>
          <Route exact path="/science" element={<News key={'science'} pageSize={5}      apiKey={this.apiKey} country={'in'} category={'science'}/>}> </Route>
          <Route exact path="/sports" element={<News key={'sports'} pageSize={5}      apiKey={this.apiKey} country={'in'} category={'sports'}/>}> </Route>
          <Route exact path="/technology" element={<News key={'technology'} pageSize={5}      apiKey={this.apiKey} country={'in'} category={'technology'}/>}> </Route>

          </Routes>
        </Router>
        

      </div>
    )
  }
}

