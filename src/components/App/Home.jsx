import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import '../../style/Home.scss'
import NavBar from '../common/NavBar'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import CitySearch from './CitySearch'


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: new Date(),
      duration: 0,
      city: '',
      cityQuery: '',
      cityLocation: {lat: 41.8781, lng: -87.6298}
    }
  }

  changeDestination = event => {
    this.setState({destination: event.target.value})
  }

  changeDate = date => {
    this.setState({startDate: date})
  }

  createTrip = () => {
    this.props.history.push('/trip-planner/create', {...this.state})
  }

  setCitySearchResult = (city, cityQuery, cityLocation) => {
    this.setState({city, cityQuery, cityLocation})
  }

  changeCitySearch = event => {
    this.setState({cityQuery: event.target.value})
  }

  render() {
    console.log(this.state.city)
    return (
      <div className='home-container'>
        <NavBar history={this.props.history}/>
        <div className ='bg'>
          <div className='ui card basic-info'>
            <h3> Start planning your trip </h3>
            <CitySearch onChange={this.changeCitySearch} onSelect={this.setCitySearchResult} query={this.state.cityQuery}/>
            <div className= "date-container">
              <h3> Start Date </h3>
              <DatePicker className="datepicker"
                  selected={this.state.startDate}
                  onChange={date => this.changeDate(date)}
              />
            </div>
            <Input
            className='duration'
            onChange={event=>this.setState({duration:event.target.value})}
            type='number'
            label='Duration'
            value={this.state.duration}
            />
            <button className="ui pink button" onClick={this.createTrip}>Let's go!</button>
          </div>
        </div>
      </div>
    )
  }
}
