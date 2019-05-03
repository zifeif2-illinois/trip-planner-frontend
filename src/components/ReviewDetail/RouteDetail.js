import React, { Component } from 'react'
import {Card, Button} from 'semantic-ui-react'
import DateCard from './DateCard'
import '../../style/RoutePlanner.scss'

// Only contains daily route
//parent: CreateTripBody
// The planner store all the routes
export default class RouteDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false
    }
  }

  // componentDidUpdate(prevProps) {
  //   if(prevProps.id != this.state.id){
  //     this.setState({
  //       ...prevProps.trip
  //     })
  //   }
  // }

  componentDidMount() {
    let trip = this.props.trip;
    console.log(trip)
    this.setState({
      ...trip,
      ready: true
    })
  }

  render() {
    // need to set the key like this so that we rerender the new date card everytime there is a new activity added
    if(this.state.ready){
      let dateCards = this.state.route.map((day, idx) =>
      <DateCard activities={day.activities} key={idx} index={day.day} hotel={day.hotel}/>)
      return (
        <div className='route-planner-container'>
          <Card.Group>
            {dateCards}
          </Card.Group>
        </div>
      )
    } else {
      return (<div>Loading...</div>)
    }
    
  }
}
