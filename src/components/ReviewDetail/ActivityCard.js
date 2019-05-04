import React, { Component } from 'react'
import { Card, Image, Input, Button} from 'semantic-ui-react'
import '../../style/ActivityCard.scss'

// This component contains activities added to route planner
export default class ActivityCard extends Component {
  constructor(props) {
    super(props)

    this.state={
      name: '',
      location: '',
      isPopularActivity: true,
    }
  }

  componentDidMount() {
    this.setState({name: this.props.name, location: this.props.formatted_address, isPopularActivity: this.props.isPopularActivity})
  }

  render() {
    return (
      <Card className='activity-container'>
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>{this.props.formatted_address? `Location: ${this.props.formatted_address}`: 'Personal Activity'}</Card.Meta>
        </Card.Content>
      </Card>
    )
    }
  
}
