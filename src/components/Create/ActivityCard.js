import React, { Component } from 'react'
import { Card, Image, Input, Button} from 'semantic-ui-react'
import '../../style/ActivityCard.scss'

// This component contains activities added to route planner
//parent: datecard
export default class ActivityCard extends Component {
  constructor(props) {
    super(props)

    this.state={
      name: '',
      location: '',
      isPopularActivity: true,
      isEditing: false,
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({name: this.props.name, isPopularActivity: this.props.isPopularActivity})
  }

  toggleEditView = () => {
    this.setState({isEditing: !this.state.isEditing})
  }
  deleteActivity=()=>{
    this.props.deleteActivity(this.props.name) //use the name as teh id
  }

  render() {
    let personalActivity = null
    if(!this.props.formatted_address) {
      return (!this.state.isEditing?
          <Card className='activity-container'>
           <Card.Content>
            <Card.Header>{this.state.name}</Card.Header>
            <Card.Meta>Personal Activity</Card.Meta>
            <a className='edit-activity' onClick={this.toggleEditView}>edit</a>
            <a className='delete-activity' onClick={this.deleteActivity}>delete</a>
            </Card.Content>
          </Card>
        :<Card className='activity-container'>
          <Card.Content>
            <Input placeholder='name' value={this.state.name} onChange={event=>this.setState({name: event.target.value})}/>
            <Button onClick={this.toggleEditView}>Save</Button>
          </Card.Content>
          </Card>)

    }
    return (
          <Card className='activity-container'>
            <Card.Content>
              <Image floated='right' size='mini' src={this.props.icon}/>
               <Card.Header>{this.props.name}</Card.Header>
               <Card.Meta>Location: {this.props.formatted_address}</Card.Meta>
               <a className='view-detail' href={this.props.url} target='_blank'>view detail</a>
               <a className='delete-activity' onClick={this.deleteActivity}>delete</a>
             </Card.Content>
          </Card>
    )
  }
}
