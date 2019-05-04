import React, { Component } from 'react'
import {Card, Button, Modal, Form} from 'semantic-ui-react'
import DateCard from './DateCard'
import ShareWidget from '../common/ShareWidget'
import '../../style/RoutePlanner.scss'
import * as firebaseApi from '../../api/firebaseAuth'

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
      mapDay: -1,
      openLoginModal: false,
      openSaveModal:false,
      name: '',
      description: ''
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
        const {name, geometry, place_id, url, formatted_address} = newAddedThing.thing
        let geometry_number = {
          location: {
            lat: geometry.location.lat(),
            lng: geometry.location.lng()
          }
        }
        route[newAddedThing.day].push(
          {name,  place_id, url, location: name, geometry: geometry_number,isPopularActivity: true, formatted_address})
        if (newAddedThing.day === this.state.mapDay) {
          let newMarkers = this.refreshMarkers(route[newAddedThing.day], this.state.hotels[newAddedThing.day]);
          this.setState({route, isSaved: false, markers: newMarkers})
        } else {
          this.setState({route, isSaved: false})
        }
      }
      else {
        let hotels = [...this.state.hotels]

        const {place_id, name, url, geometry, formatted_address} = newAddedThing.thing
        let geometry_number = {
          location: {
            lat: geometry.location.lat(),
            lng: geometry.location.lng()
          }
        }
        hotels[newAddedThing.day] = {place_id, name, url,geometry: geometry_number, isPublicHotel: true, formatted_address}
        this.setState({hotels, isSaved: false})
      }
    }
  }

  attemptToSaveTrip = () => {
    if(!firebaseApi.getCurrentUser()) {
      this.setState({openLoginModal: true})
    } else {
      this.setState({openSaveModal: true})

    }
  }

  saveTrip = () => {
    let dailyRoutes = this.state.route.map((route, index) => (
        {
          day: index,
          hotel: this.state.hotels[index],
          activities: route,
        }
      ))
    let newTrip = {
      name: this.state.name,
      description: this.state.description,
      routes: dailyRoutes,
    }
    this.props.saveTrip(newTrip);
  }

  setHotel = (hotel, dateIndex) => {
    let hotels = this.state.hotels
    hotels[dateIndex] = {name: hotel, isPublicHotel: false}
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
    if (day === this.state.mapDay) {
      let newMarkers = this.refreshMarkers(route[day], this.state.hotels[day]);
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

  handleTripAttrsChange = (e, {name, value}) => this.setState({ [name]: value })

  render() {
    // need to set the key like this so that we rerender the new date card everytime there is a new activity added
    let dateCards = this.state.route.map((activities, idx) =>
    <DateCard activities={activities} key={idx} index={idx} hotel={this.state.hotels[idx]}
     searchThings={this.props.searchThings} setHotel={this.setHotel} addCustomActicity={this.addCustomActicity}
     deleteActivity={this.deleteActivity} updateMap={this.updateMap}/>)

    let triggerButton = (<Button content='Share Your Trip' className='share-button' color='teal'/>);


    return (
      <div className='route-planner-container'>
        <Card.Group>
          {dateCards}
        </Card.Group>
        <div className='save-share-buttons'>
          <Button content="Save" className='save-button' onClick={this.attemptToSaveTrip} color='teal'/>
        </div>
        <Modal open={this.state.openLoginModal} onClose={()=>this.setState({openLoginModal: false})}closeIcon>
          <Modal.Description>
            <div className='model-content'>Login before you share!</div>
          </Modal.Description>
        </Modal>
        <Modal  open={this.state.openSaveModal} onClose={()=>this.setState({openSaveModal: false})} closeIcon>
          <Modal.Header content="Complete the information before saving the trip!"/>
          <Modal.Description className="save-modal">
            <Form onSubmit={this.saveTrip}>
              <Form.Input required fluid label='Trip name' placeholder='My Awesome Trip'
                onChange={this.handleTripAttrsChange}
                name="name"
                value={this.state.name}
              />
              <Form.TextArea label='Description' placeholder='The trip with family...'
                onChange={this.handleTripAttrsChange}
                name="description"
                value={this.state.description}
              />
              <div className="button-group">
              <Form.Button onClick={()=>this.setState({openSaveModal: false})} >Cancel</Form.Button>
              <Form.Button color="teal" >Submit</Form.Button>
              </div>
            </Form>
          </Modal.Description>
        </Modal>
      </div>)
  }
}
