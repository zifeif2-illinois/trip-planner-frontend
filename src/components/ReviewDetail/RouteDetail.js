import React, { Component } from 'react'
import {Card, Button, Icon, Modal} from 'semantic-ui-react'
import DateCard from './DateCard'
import '../../style/RoutePlanner.scss'
import * as firebaseApi from '../../api/firebaseAuth'
import ShareWidget from '../common/ShareWidget'

export default class RouteDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      openShareModal: false
    }
  }

  // componentDidUpdate(prevProps) {
  //   if(prevProps.id != this.state.id){
  //     this.setState({
  //       ...prevProps.trip
  //     })
  //   }
  // }

  jumpEdit = () => {
    this.props.editTrip()
  }

  openShare = () => {
    this.setState({openShareModal: true})
  }

  componentDidMount() {
    let trip = this.props.trip;
    console.log('In component did mount ')
    console.log(this.props.trip)
    this.setState({
      ...trip,
      ready: true
    })
  }

  render() {
    // need to set the key like this so that we rerender the new date card everytime there is a new activity added
    if(this.state.ready){
      let dateCards = this.state.routes.map((day, idx) => (<DateCard activities={day.activities} key={idx} index={day.day} hotel={day.hotel}/>))
      let shareIcon =  (<Icon className="icon" name="share square" color='teal' size="large" />)
      return (
        <div className="route-planner">
        <div className="title">
          <h1> Route Details </h1>
          <div className="icon-group">
            <Icon className="icon" name="edit" color='teal' size="large" onClick={this.jumpEdit}/>
           <ShareWidget trigger={shareIcon}/>
          </div>
        </div>
          <div className='review-route-planner-container'>
            <Card.Group>
              {dateCards}
            </Card.Group>
          </div>
          <Modal open={this.state.openShareModal} onClose={()=>this.setState({openShareModal: false})}closeIcon>
            <Modal.Description>
              <div className='model-content'>Login before you share!</div>
            </Modal.Description>
          </Modal>
        </div>
      )
    }

    else {
      return (<div>Loading...</div>)
    }

  }
}
