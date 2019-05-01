import React, { Component } from 'react'
// import { Menu, Modal, Button, Header, Icon, Input} from 'semantic-ui-react'
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
      city: this.props.city
    }
  }

  componentDidMount() {
    this.service = new google.maps.places.PlacesService(document.getElementById('map'));
  }

  addToBoard = newActivity => {
    let newResult = {day: this.state.day, thing: newActivity, id: newActivity.id ,type: this.state.type}
    this.setState({newAddedThing: newResult})
  }

  searchThings = (searchKeyword, type, day) => {
      // TODO: make api call to do search, and set searchResult with results from api
      this.setState({day, type, searchKeyword})
      const city = this.state.city.toLowerCase();
      const request = {query: `${city} ${searchKeyword} ${type}`}
      this.service.textSearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          // for (var i = 0; i < results.length; i++) {
          //   var place = results[i];
          //   createMarker(results[i]);
          // }
          // response format: [geometry, plus_code, html_attributions, icon, name, opening_hours, place_id, rating, types]
          this.setState({searchResult: results.map(result=>({...result, id: result.place_id}))})
        }
      });
  }


  render() {
    return (
      <div className='create-trip-planner'>
        <RoutePlanner searchThings={this.searchThings} newAddedThing={this.state.newAddedThing} duration={this.props.duration}/>
        <SearchView addToBoard={this.addToBoard} searchResult={this.state.searchResult}/>
        <div id='map'></div>
      </div>
    )
  }
}

// This is the whole screen of adding trip including navbar and background
export default class CreateTrip extends Component {
  render() {
    console.log(this.props.location.state)
    let startDate = this.props.location.state.startDate || new Date()
    let endDate = new Date(startDate)
    let duration = parseInt(this.props.location.state.duration)||3
    endDate.setDate(endDate.getDate() + duration)

    return (<div className='container'>
      <NavBar/>
      <div className='background'>
        <div className='title'>
          <h2> {this.props.location.state.cityQuery || 'Chicago'} </h2>
          <span> {`${startDate.toDateString()}-${endDate.toDateString()}`} </span>
        </div>
      </div>
      <CreateTripBody duration={duration} city={this.props.location.state.cityQuery || 'Chicago'}/>
    </div>)
  }
}
