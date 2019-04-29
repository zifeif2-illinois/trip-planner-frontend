import React, { Component } from 'react'
import { Card, Image, Input, Icon, Button} from 'semantic-ui-react'
import SearchInput from '../common/SearchInput'
import '../../style/ActivityCard.scss'

export default class ActivityCard extends Component {
  constructor(props) {
    super(props)

    this.state={
      name: '',
      location: '',
      type: 0
    }
  }

  componentDidMount() {
    this.setState({name: this.props.name, location: this.props.location, type: this.props.type})
  }

  render() {
    return (<Card className='activity-container'>
      <Card.Content>
        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
        <Card.Header>{this.state.name}</Card.Header>
        <Card.Meta>Location: {this.state.location}</Card.Meta>
        {!this.state.type? <a className='view-detail' href='#'>view detail</a>: null}
        {this.state.type? <a className='edit-activity'>edit</a>:null}
        <a className='delete-activity'>delete</a>
      </Card.Content>
    </Card>)
  }
}
