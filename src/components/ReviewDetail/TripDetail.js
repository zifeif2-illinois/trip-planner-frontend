import React, { Component } from 'react'
import RouteDetail from './RouteDetail'
import NavBar from '../common/NavBar'
import {Divider, Dropdown, Label} from 'semantic-ui-react'
import '../../style/ReviewTrip.scss'
import { getTripById } from '../../api/trip'
/*global google*/

export class TripDetailBody extends Component {
	constructor(props) {
		super(props)
		this.state={
			markers: [],
			trip: props.trip,
			selectedDate: -1
		}
	}

	componentDidMount() {
		let trip = this.state.trip
		let mapElement = document.getElementById('map')
		this.map = new google.maps.Map(mapElement, {
			center: trip.city.location,
			zoom: 10
		});
		this.service = new google.maps.places.PlacesService(this.map);
		let markers= this.getListOfMarkers(trip)
		this.setState({markers})
		let allMarkers = [].concat(...markers);
		this.putMarkersOnMap(allMarkers)
	}

	getListOfMarkers = (trip) => {
		return trip.routes.map((dateRoute, idx)=> dateRoute.activities.map(
			activity=> {
				let marker = new window.google.maps.Marker({
					position: activity.geometry.location,
					map: null, //TODO: add props.map
					title: activity.name,
					label: (idx+1).toString()
				});
				marker.addListener('click', e => {
					this.createInfoWindow(e, this.map, activity);
				});
				return marker;
			}
		))
	}

	//called only in componentDidMount
	putMarkersOnMap = (markers) => {
		markers.forEach(marker=>marker.setMap(this.map))
	}

	createInfoWindow=(e, map, activity)=> {
		const infoWindow = new window.google.maps.InfoWindow({
				content: activity.name,
				position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
		});
		infoWindow.open(map);
	}

	onChangeSelectedDay = (e, data) => {
		console.log(data.value)
		let selectedDate = data.value
		let markers = [...this.state.markers]
		if(selectedDate < 0) {
			// all markers are selected
			markers.forEach(markersOfADate=>{
				markersOfADate.forEach(marker=> marker.setMap(this.map))
			})
		}
		else {
			markers.forEach((markersOfADate, idx)=>{
				if(idx !== selectedDate) markersOfADate.forEach(marker=> marker.setMap(null))
				else markersOfADate.forEach(marker=> marker.setMap(this.map))
			})
		}
		this.setState({selectedDate, markers})
	}



	render() {
			let dayOptions = [{ key: 'all',  text: 'All dates', value: -1}]
			var i;
			for(i=0; i < this.state.trip.routes.length; i++) {
				let realDay = i+1
				dayOptions.push({ key: `${i}`,  text: `Day ${realDay}`, value: i})
			}
			return (
	        	<div className='trip-detail-body'>
	        		<RouteDetail className='trip-detail-component' trip={this.state.trip} />
							<Divider vertical/>
							<div className='map-container'>
								<div id='map'></div>
								<span id='dropdown-label'> View places to visit on </span>
								<Dropdown
								placeholder='Select a Special Day' options={dayOptions}	defaultValue={dayOptions[0].value}
								onChange={this.onChangeSelectedDay}/>
							</div>
	      		</div>
			)
	}
}


export default class TripDetail extends Component {

// getTrip = (id) => {
// 		return {
// 	       id: 2,
// 	       startDate: "2019-12-16T03:24:00",
// 	       duration: 2,
// 	       route: [
// 	       		{
// 	       		   day: 0,
//        		       activities:[
//        		       {
//        		       		name: 'sleep',
//        		       		location: 'union',
//        		       		isPopularActivity: false,
// 										geometry:{location: {lat: 40.119661, lng: -88.242426}}
//        		       	},
//        		       	{
//        		       		name: 'walk',
//        		       		location: 'quad',
//        		       		isPopularActivity: true,
// 										geometry:{location: {lat: 40.107677, lng: -88.227220}}
//        		       	},
//        		       ],
//        		       hotel: {
//        		       	name: 'home'
//        		       }
// 	       		},
// 	       		{
// 	       		   day: 1,
//        		       activities:[
//        		       {
//        		       		name: 'eat',
//        		       		location: 'black dog',
//        		       		isPopularActivity: true,
// 										geometry:{location: {lat: 40.118222, lng: -88.240011}}
//        		       	},
//        		       	{
//        		       		name: 'play frisbee',
//        		       		location: 'japan house',
//        		       		isPopularActivity: true,
// 										geometry:{location: {lat: 40.093110, lng: -88.217941}}
//        		       	},
//        		       ],
//        		       hotel: {
//        		       	name: 'union'
//        		       }
// 	       		}

// 	       ],
// 	       owner: 1,
// 	       shared: [2,3],
// 	       location: 'Champaign',
// 				 cityLocation: {lat: 40.1179, lng:-88.2293},
// 	       description: "A trip with family and dogs and cats and birds and bananas!!!",
// 	       name: 'Christmas Trip'
// 	      }
// 	}
	constructor(props){
		super(props)
		this.state = {
			ready: false
		}
	}

	componentDidMount() {
		let { id } = this.props.match.params
		getTripById(id)
			.then((trip) => {
				this.setState({
					trip,
					ready: true
				})
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
			          <span> {`${trip.city.name}`}</span>
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
