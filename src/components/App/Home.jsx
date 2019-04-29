import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'
import '../../style/Home.scss'
import NavBar from '../common/NavBar'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      destination: '',
      startDate: new Date(),
      duration: 0
    }
  }

  changeDestination = event => {
    this.setState({destination: event.target.value})
  }

  changeDate = date => {
    this.setState({startDate: date})
  }

  createTrip = () => {
    this.props.history.push('trip-planner/create')
  }

  render() {
    return (
      <div className='home-container'>
        <NavBar/>
        <div className ='bg'>
          <div className='ui card basic-info'>
            <h3> Start planning your trip </h3>
            <Input
            onChange={this.changeDestination}
            placeholder='Destination'
            value={this.state.destination}
            icon='search'
            iconPosition='left'
            />
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
