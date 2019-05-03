import React, { Component } from 'react'
import RouteDetail from './RouteDetail'
import NavBar from '../common/NavBar'
// import '../../style/ReviewTrip.scss'

export class TripDetailBody extends Component {
	constructor(props) {
		super(props)
		this.state={
			ready: false
		}
	}

	componentDidMount() {
		this.setState({
			trip: this.props.trip,
			ready: true,
		})
	}
	

	render() {
		if(this.state.ready)
			return (
	        	<div className='trip-detail-body'>
	        		<RouteDetail className='trip-detail-component' trip={this.state.trip} />
	      		</div>
			)
		else 
			return (<div>Loading......</div>)
	}
}


export default class TripDetail extends Component {	

getTrip = (id) => {
		return {
	       id: 2,
	       startDate: "2019-12-16T03:24:00",
	       duration: 2,
	       route: [
	       		{
	       		   day: 0, 
       		       activities:[
       		       {
       		       		name: 'sleep',
       		       		location: 'union',
       		       		isPopularActivity: false,
       		       	},
       		       	{
       		       		name: 'walk',
       		       		location: 'quad',
       		       		isPopularActivity: true,
       		       	},
       		       ],
       		       hotel: {
       		       	name: 'home'
       		       }
	       		},
	       		{
	       		   day: 1, 
       		       activities:[
       		       {
       		       		name: 'eat',
       		       		location: 'black dog',
       		       		isPopularActivity: true,
       		       	},
       		       	{
       		       		name: 'play frisbee',
       		       		location: 'japan house',
       		       		isPopularActivity: true,
       		       	},
       		       ],
       		       hotel: {
       		       	name: 'union'
       		       }
	       		}
	       	
	       ],
	       
	       owner: 1,
	       shared: [2,3],
	       location: 'Champaign',
	       description: "A trip with family and dogs and cats and birds and bananas!!!",
	       name: 'Christmas Trip'
	      }
	}
	constructor(props){
		super(props)
		this.state = {
			ready: false
		}
	}

	componentDidMount() {
		let { id } = this.props.match.params
		let trip = this.getTrip(id)
		this.setState({
			trip,
			ready: true
		})
	}

	render() {
		if(this.state.ready){
			let trip = this.state.trip;
			let startDate = new Date(Date.parse(trip.startDate));
    		let endDate = new Date(startDate.setDate(startDate.getDate() + trip.duration));
			return (
			<div className='container'>
	        	<NavBar/>
	        	<div className='background'>
			        <div className='title'>
			          <h2> {trip.name} </h2>
			          <span> {`${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}`} </span>
			          <span> {`${trip.location}`}</span>
			          <h6><i>{trip.description}</i></h6>
			        </div>
				</div>
	        		<TripDetailBody trip={this.state.trip}/>
	      	</div>
			)
		} else {
			return (<div> Loading... </div>)
		}
	}
}