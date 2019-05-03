import React, { Component } from 'react'
import { Icon} from 'semantic-ui-react'
import NavBar from '../common/NavBar'
import RoutePlanner from './RoutePlanner'
import SearchView from './SearchView'
import '../../style/CreateTrip.scss'

/*global google*/

// This component only contains route planner and search view
class CreateTripBody extends Component {
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
    console.log(mapElement)
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
      // TODO: make api call to do search, and set searchResult with results from api
      this.setState({day, type, searchKeyword})
      const city = this.state.city.toLowerCase();
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


  render() {
    return (
      <div className='create-trip-planner'>
        <RoutePlanner searchThings={this.searchThings} newAddedThing={this.state.newAddedThing}
          duration={this.props.duration} map={this.map} openModal={this.openModal}/>
        <SearchView addToBoard={this.addToBoard} searchResult={this.state.searchResult} service={this.service}
          keyword={this.state.searchKeyword} day={this.state.day} type={this.state.type}/>
        <div className={`${this.state.isModalOpen? "openModal": "closeModal"} map-modal`}>
          <div className="modal-content">
            <Icon className="close-btn" name='close' onClick={()=>this.setState({isModalOpen: false})}>&times;</Icon>
            <div id="map"></div>
          </div>
        </div>
      </div>
    )
  }
}

// This is the whole screen of adding trip including navbar and background
export default class CreateTrip extends Component {
  render() {
    let startDate = this.props.location.state.startDate || new Date()
    let endDate = new Date(startDate)
    let duration = parseInt(this.props.location.state.duration)||3
    endDate.setDate(endDate.getDate() + duration)

    return (<div className='container'>
      <NavBar history={this.props.history}/>
      <div className='background'>
        <div className='title'>
          <h2> {this.props.location.state.cityQuery || 'Chicago'} </h2>
          <span> {`${startDate.toDateString()}-${endDate.toDateString()}`} </span>
        </div>
      </div>
      <CreateTripBody
        duration={duration}
        city={this.props.location.state.cityQuery || 'Chicago'}
        cityLocation={this.props.location.state.cityLocation}
      />
    </div>)
  }
}
