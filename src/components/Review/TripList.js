import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import TripCard from './TripCard'
import '../../style/TripList.scss'

export default class TripList extends Component {

	constructor(props) {
		super(props)
		this.state={
			detailViewType: this.props.detailViewType || 'owner',
			ready: false,
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.trips !== this.props.trips)
		this.setState({
			trips: this.props.trips,
			ready: true
		})
	}

	deleteTrip = (id) => {
		let trips = this.state.trips.filter((trip) => (trip['id'] !== id))
		this.setState({
			trips
		})
	}

	render(){
		if(this.state.ready){
			let detailViewLink = `/trip-planner/review`
			let tripCards = this.state.trips.map((trip) => (
				<TripCard
				key={`${trip.id}-${trip.isShared}`}
				{...trip}
				onClick={()=>this.props.history.push(`${detailViewLink}/${trip.id}`)}
				onDeleteTrip={()=>{this.deleteTrip(trip.id)}}
				/>))
			return (
				<Card.Group>
					{tripCards}
				</Card.Group>
				)
		} else {
			return (
				<div>Loading...</div>

				)
		}

	}
}

TripList.defaultProps = {
	trips: []
}
