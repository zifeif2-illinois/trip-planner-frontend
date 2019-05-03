import React, { Component } from 'react'
import {Card, Button} from 'semantic-ui-react'
import DateCard from './DateCard'
import ShareWidget from '../common/ShareWidget'
import '../../style/RoutePlanner.scss'
import ActivityCard from './ActivityCard'
import { render } from 'react-dom';

// Only contains daily route
//parent: CreateTripBody
// The planner store all the routes
export default class RoutePlanner extends Component {
  constructor(props) {
    super(props)
    let originalHotels = new Array(this.props.duration)
    originalHotels.fill({name: ''})
    let originalPlans = new Array(this.props.duration).fill(null).map(item =>(new Array(0)))
    this.state = {
      isSaved : false,
      route: originalPlans,
      hotels: originalHotels,
      markers: [],
      mapDay: -1
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
        if (newAddedThing.day == this.state.mapDay) {
          let newMarkers = this.refreshMarkers(route[newAddedThing.day]);
          this.setState({route, isSaved: false, markers: newMarkers})
        } else {
          this.setState({route, isSaved: false})
        }
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

  setHotel = (hotel, dateIndex) => {
    let hotels = this.state.hotels
    hotels[dateIndex] = {name: hotel}
    this.setState({hotels})
  }

  addCustomActicity = (name, day) => {
    let route = [...this.state.route]
    route[day].push({name, isPopularActivity: false})
    this.setState({route, isSaved: false})
  }

  deleteActivity = (name, day) => {
    let route = [...this.state.route]
    route[day] = route[day].filter(acitivity => acitivity.name !== name)
    if (day == this.state.mapDay) {
      let newMarkers = this.refreshMarkers(route[day]);
      this.setState({route, isSaved: false, markers: newMarkers})
    } else {
      this.setState({route, isSaved: false})
    }
  }

  updateMap = (day) => {
    let newMarkers = this.refreshMarkers(this.state.route[day], this.state.hotels[day]);
    this.setState({markers: newMarkers, mapDay: day});
    this.props.openModal()
  }

  refreshMarkers = (activities, hotel) => {
    let markers = [...this.state.markers];
    markers.forEach(marker => {
      marker.setMap(null);
    });

    let newMarkers = activities.filter(activity => activity.geometry)
      .map(activity => {
        const marker = new window.google.maps.Marker({
          position: activity.geometry.location,
          map: this.props.map,
          title: activity.name
        });
        marker.addListener('click', e => {
          this.createInfoWindow(e, this.props.map, activity);
        });
        return marker;
      });
    if(hotel.geometry) {
      newMarkers.push(new window.google.maps.Marker({
        position: hotel.geometry.location,
        map: this.props.map,
        title: hotel.name
      }))
    }
    return newMarkers;
  }

  createInfoWindow(e, map, activity) {
    const infoWindow = new window.google.maps.InfoWindow({
        content: activity.name,
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    });
    infoWindow.open(map);
  }

  render() {
    // need to set the key like this so that we rerender the new date card everytime there is a new activity added
    let dateCards = this.state.route.map((activities, idx) =>
    <DateCard activities={activities} key={idx} index={idx} hotel={this.state.hotels[idx]}
     searchThings={this.props.searchThings} setHotel={this.setHotel} addCustomActicity={this.addCustomActicity}
     deleteActivity={this.deleteActivity} updateMap={this.updateMap}/>)
    return (
      <div className='route-planner-container'>
        <Card.Group>
          {dateCards}
        </Card.Group>
        <div className='save-share-buttons'>
          <Button content={this.state.isSaved? 'Saved': 'Save Your Trip Before Sharing'} className='save-button' onClick={this.saveTrip} color='teal'/>
          {this.state.isSaved?
          <ShareWidget/>:null
          }
        </div>
      </div>)
  }
}
