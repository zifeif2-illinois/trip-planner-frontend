import React, { Component } from 'react'
import { Icon} from 'semantic-ui-react'
import NavBar from '../common/NavBar'
import RoutePlanner from './RoutePlanner'
import SearchView from '../Create/SearchView'
import '../../style/EditTrip.scss'
import { Redirect, Link } from 'react-router-dom'
import {getCurrentUser} from '../../api/firebaseAuth'
import {getTripById, updateTrip} from '../../api/trip.js'
import {getCurrentUserId} from '../../api/user'

/*global google*/

// This component only contains route planner and search view
class EditTripBody extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchKeyword: '',
      type: '', //['hotel', 'attraction', 'food']
      searchResult: [],
      day: null,
      newAddedThing: null,
      city: this.props.city,
      isModalOpen: false
    }
  }

  componentDidMount() {
    let mapElement = document.getElementById('map')
    this.map = new google.maps.Map(mapElement, {
      center: this.props.cityLocation,
      zoom: 10
    });
    this.service = new google.maps.places.PlacesService(this.map);
    // Get the modal
    var modal = document.getElementById('myModal');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target === modal) {
        this.state.setState({isModalOpen: false})
      }
    }
  }

  addToBoard = newActivity => {
    let newResult = {day: this.state.day, thing: newActivity, id: newActivity.id ,type: this.state.type}
    this.setState({newAddedThing: newResult})
  }

  searchThings = (searchKeyword, type, day) => {
      this.setState({day, type, searchKeyword})
      const city = this.state.city.name.toLowerCase();
      let searchType = ''
      switch (searchType) {
        case "hotel":
          searchType = "lodging"
          break;
        case "food":
          searchType = "food"
          break;
        default:
          searchType = "point_of_interest"
      }
      const request = {query: `${city}+${searchKeyword}+${type}`}
      this.service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState({searchResult: results.map(result=>({...result, id: result.place_id,
             url: `https://www.google.com/maps/search/?api=1&query=${result.formatted_address}&query_place_id=${result.place_id}`}))})
        }
      });
  }

  openModal = () => {
    this.setState({isModalOpen: true})
  }

  updateTrip = (tripWithHotelAndRoute) => {
    let updatedTrip = Object.assign(tripWithHotelAndRoute, {
      startDate: this.props.startDate,
      name: this.props.name,
      description: this.props.description,
      duration: this.props.duration,
      city: {name: this.props.city.name, location: this.props.city.location},
      owner: getCurrentUserId(),
      shared: []
    })
    updateTrip(this.props.id, updatedTrip)
  }

  render() {
    return (
      <div className='edit-trip-planner'>
        <RoutePlanner searchThings={this.searchThings} newAddedThing={this.state.newAddedThing} trip={this.props.trip}
        updateTrip = {this.updateTrip}
          duration={this.props.duration} map={this.map} openModal={this.openModal} jumpReview={this.props.jumpReview}/>
        <SearchView addToBoard={this.addToBoard} searchResult={this.state.searchResult} service={this.service}
          keyword={this.state.searchKeyword} day={this.state.day} type={this.state.type}/>
        <div className={`${this.state.isModalOpen? "openModal": "closeModal"} map-modal`}>
          <div className="modal-content">
            <Icon className="close-btn" name='close' onClick={()=>this.setState({isModalOpen: false})}/>
            <div id="map"></div>
          </div>
        </div>
      </div>
    )
  }
}

// This is the whole screen of adding trip including navbar and background
export default class EditTrip extends Component {

  constructor(props) {
    super(props)
    this.state = {
      trip: null
    }
  }


  componentDidMount() {
    // if(!getCurrentUser()) return this.props.history.push('/trip-planner')
    let tripId = this.props.match.params.id
    getTripById(tripId).then(trip => {
      this.setState({
        trip,
        id: tripId
      })
    })
  }

  jumpReview = () => this.props.history.push(`/trip-planner/review/${this.props.match.params.id}`)

  render() {
    if(!this.state.trip) return <div> Loading... </div>
    let trip = this.state.trip;
    let startDate = new Date(Date.parse(trip.startDate));
    let endDate = new Date(startDate.setDate(startDate.getDate() + trip.duration));
    return (<div className='container'>
      <NavBar history={this.props.history}/>
      <div className='background'>
        <div className='title'>
            <h2> {trip.name} </h2>
            <span> {`${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}`} </span>
            <span> {`${trip.city.name}`}</span>
            <h6><i>{trip.description}</i></h6>
        </div>
      </div>
      <EditTripBody trip={trip} jumpReview={this.jumpReview}
        duration={this.state.trip.duration}
        city={this.state.trip.city.name || 'Chicago'}
        cityLocation={this.state.trip.city.location}
        id={this.state.id} {...trip}
      />
    </div>)
  }
}
