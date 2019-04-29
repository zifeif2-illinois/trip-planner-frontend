import React, { Component } from 'react'
// import { Menu, Modal, Button, Header, Icon, Input} from 'semantic-ui-react'
import NavBar from '../common/NavBar'
import RoutePlanner from './RoutePlanner'
import SearchView from './SearchView'
import '../../style/CreateTrip.scss'

class CreateTripBody extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='create-trip-planner'>
        <RoutePlanner/>
        <SearchView/>
      </div>
    )
  }
}

export default class CreateTrip extends Component {
  render() {
    return (<div className='container'>
      <NavBar/>
      <div className='background'>
        <div className='title'>
          <h2> Chicago </h2>
          <span> 03/11/2019 - 03/13/2019 </span>
        </div>
      </div>
      <CreateTripBody/>
    </div>)
  }
}
