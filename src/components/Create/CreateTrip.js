import React, { Component } from 'react'
// import { Menu, Modal, Button, Header, Icon, Input} from 'semantic-ui-react'
import NavBar from '../common/NavBar'
import RoutePlanner from './RoutePlanner'
import SearchView from './SearchView'
import '../../style/CreateTrip.scss'

const DUMMY_RESULT = ['Secret ', 'Horror ', 'Mary\'s ', 'Fancy ', 'Comfy ', 'Royal ']
// This component only contains route planner and search view
class CreateTripBody extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchKeyword: '',
      type: '', //['hotel', 'attraction', 'food']
      searchResult: [],
      day: null,
      newAddedThing: null
    }
  }

  addToBoard = newActivity => {
    console.log(newActivity)
    let newResult = {day: this.state.day, thing: newActivity, id: newActivity.id ,type: this.state.type}
    this.setState({newAddedThing: newResult})
  }

  searchThings = (searchKeyword, type, day) => {
      // TODO: make api call to do search, and set searchResult with results from api
      this.setState({day, type, searchKeyword})

      this.setState({searchResult: DUMMY_RESULT.map(place=>({
        name: place + type + ' '+ searchKeyword,
        id: place + type + ' '+ searchKeyword,
        location: 'wherever'
        })
      )// end of map function
      })
  }


  render() {
    return (
      <div className='create-trip-planner'>
        <RoutePlanner searchThings={this.searchThings} newAddedThing={this.state.newAddedThing} duration={this.props.duration}/>
        <SearchView addToBoard={this.addToBoard} searchResult={this.state.searchResult}/>
      </div>
    )
  }
}

// This is the whole screen of adding trip including navbar and background
export default class CreateTrip extends Component {
  render() {
    let startDate = this.props.location.startDate || new Date()
    let endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + this.props.location.duration||3)

    return (<div className='container'>
      <NavBar/>
      <div className='background'>
        <div className='title'>
          <h2> {this.props.location.city || 'Chicago'} </h2>
          <span> {`${startDate.toDateString()}-${endDate.toDateString()}`} </span>
        </div>
      </div>
      <CreateTripBody duration={this.props.location.duration||3}/>
    </div>)
  }
}
