import React, { Component } from 'react'
import '../../style/Home.scss'
import PokemonContext from './PokemonContext'
import NavBar from '../common/NavBar.jsx'

export default class Home extends Component {
  render() {
    return (
      <div className='home-container'>
        <NavBar active='home'/>
        <div className ='bg'>
          <h1>Welcome to the Pokemon Demo!</h1>
        </div>
      </div>
    )
  }
}

Home.contextType = PokemonContext
