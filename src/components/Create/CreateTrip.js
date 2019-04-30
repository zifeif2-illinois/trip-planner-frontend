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
    let startDate = this.props.location.startDate || new Date()
    let endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + this.props.location.duration||3)
    return (<div className='container'>
      <NavBar/>
      <div className='background'>
        <div className='title'>
          <h2> {this.props.location.city || 'Chicago'} </h2>
          <span> {`${startDate.toDateString()}-${endDate.toDateString()}`} </span>
        </div>
      </div>
      <CreateTripBody/>
    </div>)
  }
}