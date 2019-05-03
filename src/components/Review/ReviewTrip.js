import React, { Component } from 'react'
// import { Menu, Modal, Button, Header, Icon, Input} from 'semantic-ui-react'
import NavBar from '../common/NavBar'
import ReviewView from './ReviewView'
import '../../style/ReviewTrip.scss'
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

  getTrips = () => {
    return [
      {
       id: 1,
       startDate: "2018-12-16T03:24:00",
       duration: 3,
       routes: [
       ],
       owner: 1,
       shared: [2,3],
       location: 'Chicago',
       description: "A trip with family and dogs and cats and birds and bananas!!!",
       name: 'Thanksgiving Trip'
      },
       {
       id: 2,
       startDate: "2019-12-16T03:24:00",
       duration: 2,
       routes: [
       ],
       owner: 1,
       shared: [2,3],
       location: 'Champaign',
       description: "A trip with family and dogs and cats and birds and bananas!!!",
       name: 'Christmas Trip'
      },
       {
       id: 3,
       startDate: "2016-12-06T03:24:00",
       duration: 6,
       routes: [
       ],
       owner: 1,
       shared: [2,3],
       location: 'Hawaii',
       description: "A trip with family and dogs and cats and birds and bananas!!!",
       name: 'December Trip'
      },
       {
       id: 4,
       startDate: "2019-06-23T03:24:00",
       duration: 8,
       routes: [
       ],
       owner: 1,
       shared: [2,3],
       location: 'Banana World',
       description: "A trip with family and dogs and cats and birds and bananas!!!",
       name: 'Winter Break Trip'
      },
    ]
  }

  componentDidMount() {
    let trips = this.getTrips()
    this.setState({
        trips,
        ready: true
      })
  }
//         

  render() {
    return (
      <div className='review-trip-planner'>
        <ReviewView trips={this.state.trips}/>
      </div>
    )
  }
}

// This is the whole screen of adding trip including navbar and background
export default class ReviewTrip extends Component {
  render() {
    return (
      <div className='container'>
        <NavBar/>
        <ReviewTripBody/>
      </div>
    )
  }
}
