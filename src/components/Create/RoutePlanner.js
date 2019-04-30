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
    console.log("originalHotels in route planner")
    console.log(originalHotels)
    this.state = {
      isSaved : false,
      route: [[
        {name: 'Japan House', location: 'Somewhere', link: 'http://www.google.com', isPopularActivity: true,image: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
        {name: 'Eat Icecream', location: 'Somewhere', link: 'http://www.google.com', isPopularActivity: false,image: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
      ],
      [
        {name: 'Japan House Day2', location: 'Somewhere', link: 'http://www.google.com', isPopularActivity: true,image: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
        {name: 'Eat Icecream Day2', location: 'Somewhere', link: 'http://www.google.com', isPopularActivity: false,image: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
      ],
      []
    ],
      hotels: originalHotels
    }
  }

  getRequiredFieldOfThing = ({ id, name, location}) => ({ id, name, location })

  componentDidUpdate(prevProps) {
    if(!prevProps.newAddedThing && !this.props.newAddedThing) return;
    if( (!prevProps.newAddedThing && this.props.newAddedThing) ||
        (prevProps.newAddedThing.day !== this.props.newAddedThing.day ||
          prevProps.newAddedThing.id !== this.props.newAddedThing.id)) {
      let newAddedThing = this.props.newAddedThing
      if (newAddedThing.type !== 'hotel'){
        let route = [...this.state.route]
        route[newAddedThing.day].push(this.getRequiredFieldOfThing(newAddedThing.thing))
        this.setState({route, isSaved: false})
      }
      else {
        let hotels = [...this.state.hotels]
        hotels[newAddedThing.day] = this.getRequiredFieldOfThing(newAddedThing.thing)
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
    <DateCard activities={activities} key={idx+''+activities.length} index={idx} hotel={this.state.hotels[idx]}
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
