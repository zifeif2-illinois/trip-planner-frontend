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
      isEditing: false
    }
  }

  componentDidMount() {
    this.setState({name: this.props.name, location: this.props.location, isPopularActivity: this.props.isPopularActivity})
  }

  toggleEditView = () => {
    this.setState({isEditing: !this.state.isEditing})
  }


  render() {
    let personalActivity = null
    if(!this.state.isPopularActivity) {
      personalActivity = (!this.state.isEditing?
         <Card.Content>
          <Card.Header>{this.state.name}</Card.Header>
          <Card.Meta>{this.state.location? `Location: ${this.state.location}`: 'wherever'}</Card.Meta>
          <a className='edit-activity' onClick={this.toggleEditView}>edit</a>
          <a className='delete-activity'>delete</a>
          </Card.Content>
        : <Card.Content>
          <Input placeholder='name' value={this.state.name} onChange={event=>this.setState({name: event.target.value})}/>
          <Input placeholder='wherever' value={this.state.location} onChange={event=>this.setState({location: event.target.value})}/>
          <Button onClick={this.toggleEditView}>Save</Button>
        </Card.Content>)
    }
    return (
        this.state.isPopularActivity?
          <Card className='activity-container'>
            <Card.Content>
              <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
               <Card.Header>{this.state.name}</Card.Header>
               <Card.Meta>Location: {this.state.location}</Card.Meta>
               <a className='view-detail' href='#'>view detail</a>
               <a className='delete-activity'>delete</a>
             </Card.Content>
          </Card>
           : <Card className='activity-container'> {personalActivity} </Card>
    )
  }
}
