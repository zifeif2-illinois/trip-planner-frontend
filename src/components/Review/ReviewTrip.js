import React, { Component } from 'react'
// import { Menu, Modal, Button, Header, Icon, Input} from 'semantic-ui-react'
import NavBar from '../common/NavBar'
import ReviewView from './ReviewView'
import '../../style/ReviewTrip.scss'
import { getTrips } from '../../api/trip'
/*global google*/

// This component only contains route planner and search view
class ReviewTripBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trips: [],
      ready: false,
    }
  }


  componentDidMount() {
    getTrips()
    .then((trips) => {
       this.setState({
        trips,
        ready: true
      })
    })
   
  }
//

  render() {
    return (
      <div className='review-trip-body'>
        <ReviewView trips={this.state.trips}/>
      </div>
    )
  }
}

// This is the whole screen of adding trip including navbar and background
export default class ReviewTrip extends Component {
  render() {
    return (
      <div className='review-trip-container'>
        <NavBar/>
        <ReviewTripBody/>
      </div>
    )
  }
}
