import React, { Component } from 'react'
import {Card, Button, Modal} from 'semantic-ui-react'
import DateCard from '../Create/DateCard'
import ShareWidget from '../common/ShareWidget'
import '../../style/RoutePlanner.scss'
import * as firebaseApi from '../../api/firebaseAuth'

// Only contains daily route
//parent: CreateTripBody
// The planner store all the routes
export default class RoutePlanner extends Component {
  constructor(props) {
    super(props)

    let route = props.trip.route.map(dayRoute=>dayRoute.activities)
    let hotels = props.trip.route.map(dayRoute=>dayRoute.hotel)
    this.state = {
      route,
      hotels,
      markers: [],
      mapDay: -1,
      openLoginModal: false,
      openSaveModel:false
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
        if (newAddedThing.day === this.state.mapDay) {
          let newMarkers = this.refreshMarkers(route[newAddedThing.day], this.state.hotels[newAddedThing.day]);
          this.setState({route, markers: newMarkers})
        } else {
          this.setState({route})
        }
      }
      else {
        let hotels = [...this.state.hotels]
        hotels[newAddedThing.day] = newAddedThing.thing
        this.setState({hotels})
      }
    }
  }

  saveTrip = () => {
    console.log(this.state.route)
    console.log(this.state.hotels)
    this.props.jumpReview();
    // TODO: call api function to save the trip. Before saving the trip, transform the trip structure to the backend one
  }

  setHotel = (hotel, dateIndex) => {
    let hotels = this.state.hotels
    hotels[dateIndex] = {name: hotel}
    this.setState({hotels})
  }

  addCustomActicity = (name, day) => {
    let route = [...this.state.route]
    route[day].push({name, isPopularActivity: false})
    this.setState({route})
  }

  deleteActivity = (name, day) => {
    let route = new Array(this.state.route.length)
    var i =0;
    for(;i<this.state.route.length; i++) {
        route[i] = [...this.state.route[i]]
    }
    route[day] = route[day].filter(acitivity => acitivity.name !== name)
    console.log(route)
    if (day === this.state.mapDay) {
      let newMarkers = this.refreshMarkers(route[day], this.state.hotels[day]);
      this.setState({route, markers: newMarkers})
    } else {
      this.setState({route})
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
        console.log(activity.geometry.location)
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
    console.log(this.state.route)
    // need to set the key like this so that we rerender the new date card everytime there is a new activity added
    let dateCards = this.state.route.map((activities, idx) =>
    <DateCard activities={activities} key={`${idx}-edit`} index={idx} hotel={this.state.hotels[idx]}
     searchThings={this.props.searchThings} setHotel={this.setHotel} addCustomActicity={this.addCustomActicity}
     deleteActivity={this.deleteActivity} updateMap={this.updateMap}/>)

    return (
      <div className='route-planner-container'>
        <Card.Group>
          {dateCards}
        </Card.Group>
        <div className='save-share-buttons'>
          <Button content="Save" className='save-button' onClick={this.saveTrip} color='teal'/>
        </div>
      </div>)
  }
}
