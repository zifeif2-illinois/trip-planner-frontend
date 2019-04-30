import React, { Component } from 'react'
import { Card, Header, Input, Icon, Button} from 'semantic-ui-react'
import SearchInput from '../common/SearchInput'
import '../../style/RoutePlanner.scss'
import ActivityCard from './ActivityCard'
import SelectionButtons from '../common/SelectionButtons'
import NewActivityCard from './NewActivityCard'

class DateCard extends Component {

    constructor(props) {
      super(props)

      this.state={
        hotel: {},
        searchHotel: '',
        isSearchingHotel: true,
        activities: [
          {name: 'Japan House', location: 'Somewhere', link: 'http://www.google.com', type: 1,image: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
          {name: 'Eat Icecream', location: 'Somewhere', link: 'http://www.google.com', type: 0,image: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'},
        ],
        isAddingNewActivity: false
      }
    }

    switchHotel = () => {
      this.setState({isSearchingHotel: !this.state.isSearchingHotel})
    }
    openAddActivityCard =() => {
      this.setState({isAddingNewActivity: !this.state.isAddingNewActivity})
    }

    render() {
      let listOfActivities = this.state.activities.map(activity => <ActivityCard key={activity.name} {...activity} />)
      return (<Card className='day-container'>
        <Card.Content>
          <Card.Header>Day 1</Card.Header>
          <Header.Content>
            <div className='hotel-container'>
              <Icon name='hotel' />
              Staying in
              {this.state.hotel.name?
                <div>
                  <span> {this.state.hotel.name} </span>
                </div>
                :
                <div className='hotel-container'>
                {this.state.isSearchingHotel?
                  <SearchInput onChange={event=>this.setState({searchHotel: event.target.value})}
                    placeholder='search hotel...' value={this.state.searchHotel}/>:
                  <Input onChange={()=>this.setState({customHotel: this.state.customHotel})} value={this.state.customHotel}
                    action={{ color: 'teal', icon: 'plus' }}/>
                }
                <SelectionButtons option1='Popular' option2='Personal'
                selectOption1={this.state.isSearchingHotel} onToggle={this.switchHotel}/>
                </div>
              }

              <Button className='map-button' icon='map marker alternate' color='teal' content='View on map' />
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
              <NewActivityCard/>:null
            }
        </Card.Content>
      </Card>)
    }
}

export default class RoutePlanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSaved : false,
    }
  }

  saveTrip = () => {
    this.setState({isSaved: true})
  }

  render() {
    return (
      <div className='route-planner-container'>
        <Card.Group>
          <DateCard/>
        </Card.Group>
        <div className='save-share-buttons'>
          <Button content={this.state.isSaved? 'Saved': 'Save Your Trip Before Sharing'} className='save-button' onClick={this.saveTrip} color='teal'/>
          <Button content='Share Your Trip' className='share-button' disable={!this.state.isSaved?"true":"false"} onClick={this.shareTrip} color='teal'/>
        </div>
      </div>)
  }
}
