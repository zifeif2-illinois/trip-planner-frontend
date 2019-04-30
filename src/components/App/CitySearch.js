// Imports
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Input } from 'semantic-ui-react'
import '../../style/Home.scss';
// import {GOOGLE_PLACES_API_KEY} from '../../config.js';

// Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

class CitySearch extends Component {
  componentDidMount() {
    // Declare Options For Autocomplete
    var options = {
      types: ['(cities)'],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('city-search'),
      options,
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect =()=> {
    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.props.onSelect(address[0].long_name, addressObject.formatted_address)
    }
  }

  render() {
    return (
      <div className="city-search" >
        <Input id="city-search" value={this.props.query} onChange={this.props.onChange} placeholder="Destination" icon='search' iconPosition='left'/>
      </div>
    );
  }
}
export default CitySearch;
