import React, { Component } from 'react'
import { Card, Header, Input, Icon, Button} from 'semantic-ui-react'
import SearchInput from '../common/SearchInput'
import '../../style/RoutePlanner.scss'
import ActivityCard from './ActivityCard'
import SelectionButtons from '../common/SelectionButtons'
import NewActivityCard from './NewActivityCard'

// Contains attractions for each day, receive a list of activities to populate the route
// parent: RoutePlanner
export default class DateCard extends Component {

    constructor(props) {
      super(props)
      console.log('create new card')
      this.state={
        hotel: {},
        searchHotel: '',
        isSearchingHotel: true,
        activities: this.props.activities,
        isAddingNewActivity: false
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
      } else if(this.state.isAddingNewActivity && this.props.activities.length !== prevProps.activities.length) {
        this.setState({isAddingNewActivity: false, activities: this.props.activities})
      }
    }

    editHotel = () => {
      let hotel = {...this.state.hotel}
      hotel.name = ''
      this.setState({hotel, searchHotel: this.state.hotel.name})
    }

    render() {
      let listOfActivities = this.state.activities.map(activity => <ActivityCard key={activity.name} {...activity} />)
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
                  <a className='edit-activity' onClick={this.editHotel}>edit</a>
                </div>
                :
                <div className='hotel-value-container'>
                {this.state.isSearchingHotel?
                  <SearchInput onChange={event=>this.setState({searchHotel: event.target.value})}
                    placeholder='search hotel...' value={this.state.searchHotel}
                    searchOnClick={()=>this.searchThings(this.state.searchHotel, 'hotel')}/>:
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
              <NewActivityCard onCancel={()=>this.setState({isAddingNewActivity: false})} searchThings={this.searchThings}/>:null
            }
        </Card.Content>
      </Card>)
    }
}
