import React, { Component } from 'react'
import { Card, Button} from 'semantic-ui-react'
import '../../style/TripCard.scss'
import PropTypes from 'prop-types';

// This component contains activities added to route planner
export default class TripCard extends Component {
  constructor(props) {
    super(props)
    this.state={
      location: '',
      date: '',
      description: '',
      isDeleting: false,
      detailViewLink: '',
      name: ''
    }
  }

  componentDidMount(){
    this.setState({location: this.props.location, startDate: this.props.startDate, description: this.props.description, 
      isDeleting: this.props.isDeleting, detailViewLink: this.props.detailViewLink, name: this.props.name,
      duration: this.props.duration
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps != this.props){
      this.setState({location: this.props.location, startDate: this.props.startDate, description: this.props.description, 
      isDeleting: this.props.isDeleting, detailViewLink: this.props.detailViewLink, name: this.props.name,
      duration: this.props.duration
    })
    }
  }
  deleteTrip = () => {
    this.props.onDeleteTrip()
  }

  render() {
    let startDate = new Date(Date.parse(this.state.startDate));
    let endDate = new Date(startDate.setDate(startDate.getDate() + this.state.duration));
    
    return (
          <Card className='trip-card-container' href={this.state.detailViewLink}>
            <Card.Content>
              <Card.Header>{this.state.location}</Card.Header>
              <Card.Meta>{`${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}\tDuration: ${this.state.duration}`}</Card.Meta>
              <Card.Description>{this.state.description}</Card.Description>
             </Card.Content>
             {this.state.isDeleting ? 
              <Card.Content extra>
                <Button onClick={this.deleteTrip} color='red'>Delete Trip</Button>
              </Card.Content> :
              null
             }
              
          </Card>
    )
  }
}

TripCard.propTypes = {
  location: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  description: PropTypes.string,
  detailViewLink: PropTypes.string,
  duration: PropTypes.number.isRequired,
  onDeleteTrip: PropTypes.func,
  name: PropTypes.string.isRequired,
}