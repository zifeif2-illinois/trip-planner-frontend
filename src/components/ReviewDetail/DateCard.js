import React, { Component } from 'react'
import { Card, Header, Icon} from 'semantic-ui-react'
import '../../style/RoutePlanner.scss'
import ActivityCard from './ActivityCard'

// Contains attractions for each day, receive a list of activities to populate the route
// parent: RoutePlanner
export default class DateCard extends Component {

    constructor(props) {
      super(props)

      this.state={
        hotel: null,
        ready: false
       }
    }

    componentDidMount() {
      this.setState({
        activities: this.props.activities,
        hotel: this.props.hotel,
        ready: true
      })
    }


    render() {
      if(!this.state.ready){
        return (<div>Loading...</div>)
      }
      let listOfActivities = this.state.activities.map(activity => <ActivityCard key={activity.name} {...activity} />)
      return (
        <Card className='day-container'>
        <Card.Content>
          <Card.Header>Day {this.props.index+1}</Card.Header>
          <Header.Content>
            <div className='hotel-container'>
              <Icon name='hotel' />
              Staying in
                <div className='hotel-name'>
                  <span> {this.state.hotel.name} </span>
                </div>
            </div>
          </Header.Content>
        </Card.Content>
        {this.state.activities.length?
          <Card.Content extra>
            {listOfActivities}
          </Card.Content>
          :null
        }
        </Card>
        )
  }
}
