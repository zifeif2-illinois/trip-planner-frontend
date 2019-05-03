import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import  TripList  from './TripList'
import '../../style/ReviewView.scss'

export default class ReviewView extends Component {
	constructor(props){
		super(props)
	}

	hasDatePast = (date) => {
		let today = Date.now()
		return new Date(date) < today
	}

	render() {
		const upcomingTrips = this.props.trips.filter((trip) => (this.hasDatePast(trip.startDate)))
		const pastTrips = this.props.trips.filter((trip) => (!this.hasDatePast(trip.startDate)))
		return (
			<div>
				<div className="review-trip-list">
				<Header as='h2' content= 'Upcoming Trips' className="subheader" />
					<TripList trips={upcomingTrips} />
				</div>
				<div className="review-trip-list">
				<Header as='h2' content= 'Past Trips' className="subheader" />
					<TripList trips={pastTrips} detailViewType="other" />
				</div>
			</div>
			)
	}
}