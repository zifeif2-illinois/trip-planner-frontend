import React, { Component } from 'react'
// import { Menu, Modal, Button, Header, Icon, Input} from 'semantic-ui-react'
import NavBar from '../common/NavBar'
import ReviewView from './ReviewView'
import '../../style/ReviewTrip.scss'
import {getCurrentUser} from '../../api/firebaseAuth'
import { getTrips, getSharedTrips } from '../../api/trip'
/*global google*/

// This component only contains route planner and search view
class ReviewTripBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trips: [],
      tripsSharedWithMe: [],
      ready: false,
    }
  }


  componentDidMount() {
    Promise.all([getTrips(), getSharedTrips()])
    .then((trips) => {

      console.log(trips)
      let tripsSharedWithMe= trips[1].map(trip=>Object.assign(trip, {isShared: true}))
      console.log(trips[0])
       this.setState({
        trips: trips[0],
        tripsSharedWithMe,
        ready: true
      })
    })

  }
//

  render() {
    return (
      <div className='review-trip-body'>
        <ReviewView history={this.props.history} trips={this.state.trips} tripsSharedWithMe={this.state.tripsSharedWithMe}/>
      </div>
    )
  }
}

// This is the whole screen of adding trip including navbar and background
export default class ReviewTrip extends Component {
  // componentDidMount() {
  //   if(!getCurrentUser()) return this.props.history.push('/trip-planner')
  // }
  render() {
    return (
      <div className='review-trip-container'>
        <NavBar/>
        <ReviewTripBody history={this.props.history}/>
      </div>
    )
  }
}
