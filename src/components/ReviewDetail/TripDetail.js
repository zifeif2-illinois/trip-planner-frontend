import React, { Component } from 'react'
import RouteDetail from './RouteDetail'
import NavBar from '../common/NavBar'
import '../../style/ReviewTrip.scss'

export default class TripDetail extends Component {

	constructor(props) {
		super(props)
		this.state={
			ready: false
		}
	}

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

	componentDidMount() {
		let { id } = this.props.match.params
		let trip = this.getTrip(id)
		this.setState({
			trip,
			ready: true
		})
	}

	render() {
		if(this.state.ready)
			return (
			<div className='container'>
	        	<NavBar/>
	        	<RouteDetail trip={this.state.trip} />
	      	</div>
			)
		else 
			return (<div>Loading......</div>)
	}
}