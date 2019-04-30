import React, { Component } from 'react'
import {Card, Button} from 'semantic-ui-react'
import DateCard from './DateCard'
import '../../style/RoutePlanner.scss'

// Only contains daily route
export default class RoutePlanner extends Component {
  constructor(props) {
    super(props)
    let originalHotels = new Array(this.props.duration)
    originalHotels.fill({name: ''})
    let originalPlans = new Array(this.props.duration).fill(null).map(item =>(new Array(0)))
    this.state = {
      isSaved : false,
      route: originalPlans,
      hotels: originalHotels
    }
  }


  componentDidUpdate(prevProps) {
    if(!prevProps.newAddedThing && !this.props.newAddedThing) return;
    if( (!prevProps.newAddedThing && this.props.newAddedThing) ||
        (prevProps.newAddedThing.day !== this.props.newAddedThing.day ||
          prevProps.newAddedThing.id !== this.props.newAddedThing.id)) {
      let newAddedThing = this.props.newAddedThing
      if (newAddedThing.type !== 'hotel'){
        let route = [...this.state.route]
        route[newAddedThing.day].push(newAddedThing.thing)
        this.setState({route, isSaved: false})
      }
      else {
        let hotels = [...this.state.hotels]
        hotels[newAddedThing.day] = newAddedThing.thing
        console.log(hotels)
        this.setState({hotels, isSaved: false})
      }
    }
  }

  saveTrip = () => {
    this.setState({isSaved: true})
  }

  render() {
    // need to set the key like this so that we rerender the new date card everytime there is a new activity added
    let dateCards = this.state.route.map((activities, idx) =>
    <DateCard activities={activities} key={idx} index={idx} hotel={this.state.hotels[idx]}
     searchThings={this.props.searchThings}/>)
    return (
      <div className='route-planner-container'>
        <Card.Group>
          {dateCards}
        </Card.Group>
        <div className='save-share-buttons'>
          <Button content={this.state.isSaved? 'Saved': 'Save Your Trip Before Sharing'} className='save-button' onClick={this.saveTrip} color='teal'/>
          {this.state.isSaved?
          <Button content='Share Your Trip' className='share-button' onClick={this.shareTrip} color='teal'/>:null
          }
        </div>
      </div>)
  }
}
