import React, { Component } from 'react'
import { Card, Header, Input, Icon, Button} from 'semantic-ui-react'
import SearchInput from '../common/SearchInput'
import '../../style/RoutePlanner.scss'
import ActivityCard from './ActivityCard'
import SelectionButtons from '../common/SelectionButtons'
import NewActivityCard from './NewActivityCard'

// Contains attractions for each day, receive a list of activities to populate the route
// parent: RoutePlanner
// component of DateCard: {
  // hotel: {}, activities: []
//}
export default class DateCard extends Component {

    constructor(props) {
      super(props)

      this.state={
        hotel: {},
        searchHotel: '',
        isSearchingHotel: true,
        activities: this.props.activities,
        isAddingNewActivity: false,
        customHotel: ''
      }
    }


    switchHotel = () => {
      this.setState({isSearchingHotel: !this.state.isSearchingHotel})
    }
    openAddActivityCard =() => {
      this.setState({isAddingNewActivity: !this.state.isAddingNewActivity})
    }

    searchThings=(keyword, type) => {
      // Add its own day index
      this.props.searchThings(keyword, type, this.props.index)
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.hotel.name !== this.props.hotel.name) {
        this.setState({hotel: this.props.hotel})
      } else if(this.props.activities.length !== prevProps.activities.length) {
        this.setState({activities: this.props.activities})
      }
    }

    editHotel = () => {
      let hotel = {...this.state.hotel}
      hotel.name = ''
      this.setState({hotel, searchHotel: this.state.hotel.name})
    }

    setCustomHotel = () => {
      let hotelName = this.state.customHotel
      this.setState({hotel: {name: hotelName}})
      this.props.setHotel(hotelName, this.props.index)
    }

    addCustomActicity = name => {
      this.props.addCustomActicity(name, this.props.index)
    }

    deleteActivity = name => {
        this.props.deleteActivity(name, this.props.index)
    }

    updateMap = () => {
      this.props.updateMap(this.props.index);
    }

    render() {
      let listOfActivities = this.state.activities.map(activity => <ActivityCard deleteActivity={this.deleteActivity} key={activity.name} {...activity} />)
      return (<Card className='day-container'>
        <Card.Content>
          <Card.Header>Day {this.props.index+1}</Card.Header>
          <Header.Content>
            <div className='hotel-container'>
              <Icon name='hotel' />
              Staying in
              {this.state.hotel.name?
                <div className='hotel-name'>
                  <span> {this.state.hotel.name} </span>
                  {this.state.hotel.url? <a className='edit-activity' href={this.state.hotel.url} target='_blank'> view detail </a>:null}
                  <a className='edit-activity' onClick={this.editHotel}>edit</a>
                </div>
                :
                <div className='hotel-value-container'>
                {this.state.isSearchingHotel?
                  <SearchInput onChange={event=>this.setState({searchHotel: event.target.value})}
                    placeholder='popular hotel' value={this.state.searchHotel}
                    searchOnClick={()=>this.searchThings(this.state.searchHotel, 'hotel')}/>
                  :
                  <Input onChange={event=>this.setState({customHotel: event.target.value})} value={this.state.customHotel}
                    action={{ color: 'teal', icon: 'plus', onClick: this.setCustomHotel}}/>
                }
                <SelectionButtons option1='Popular' option2='Personal'
                selectOption1={this.state.isSearchingHotel} onToggle={this.switchHotel}/>
                </div>
              }
              <Button className='map-button' icon='map marker alternate' color='teal' content='View on map' onClick={this.updateMap}/>
            </div>
          </Header.Content>
        </Card.Content>
        {this.state.activities.length?
          <Card.Content extra>
            {listOfActivities}
          </Card.Content>
          :null
        }
        <Card.Content extra className='new-activity-button-container'>
            <Button basic color='teal' onClick={this.openAddActivityCard}>
              Add New Activity
            </Button>
            {this.state.isAddingNewActivity?
              <NewActivityCard onCancel={()=>this.setState({isAddingNewActivity: false})}
              searchThings={this.searchThings} addCustomActicity={this.addCustomActicity}/>
              : null
            }
        </Card.Content>
      </Card>)
    }
}
