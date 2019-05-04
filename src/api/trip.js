import axios from 'axios'
import {sharedDummyTrip} from './dummy-for-shared'

const tripUrl = "https://us-central1-cs498rk-239014.cloudfunctions.net/trip/"
export function createNewTrip(trip) {
	dummyTrips.push(trip)
	console.log(trip.toString())
       return axios.post(tripUrl,{description: JSON.stringify(trip)})
              .then((data) => {
                     console.log(data.data)
                     return data.data.id
              })

}

export function updateTrip(tripId, updatedTrip) {
	return axios.put(`${tripUrl}${tripId}`,{description: JSON.stringify(updatedTrip)})
              .then((data) => {
                     console.log(data.data)
                     return data.data.id
              })
}

export function getTrips(){
	return new Promise((resolve) => {
		resolve(dummyTrips)
	})
}

export function getSharedTrips() {
	return new Promise((resolve) => {
		resolve(sharedDummyTrip)
	})
}


export function getTripById(tripId) {
       return axios.get(`${tripUrl}${tripId}`)
              .then((data)=>{
                     console.log(data.data.data)
                     return JSON.parse(data.data.data.description)
              })
			//  return new Promise((resolve) => {
		 	// 	resolve(sharedDummyTrip[tripId])
		 	// })

}

var dummyTrips = [
      {
       id: 1,
       startDate: "2018-12-16T03:24:00",
       duration: 3,
       routes: [{
	       		   day: 0,
       		       activities:[
       		       {
       		       		name: 'sleep',
       		       		location: 'union',
       		       		isPopularActivity: false,
										geometry:{location: {lat: 40.119661, lng: -88.242426}}
       		       	},
       		       	{
       		       		name: 'walk',
       		       		location: 'quad',
       		       		isPopularActivity: true,
										geometry:{location: {lat: 40.107677, lng: -88.227220}}
       		       	},
       		       ],
       		       hotel: {
       		       	name: 'home',
       		             isPublicHotel: false,
                            }
	       		},
	       		{
	       		   day: 1,
       		       activities:[
       		       {
       		       		name: 'eat',
       		       		location: 'black dog',
       		       		isPopularActivity: true,
										geometry:{location: {lat: 40.118222, lng: -88.240011}}
       		       	},
       		       	{
       		       		name: 'play frisbee',
       		       		location: 'japan house',
       		       		isPopularActivity: true,
										geometry:{location: {lat: 40.093110, lng: -88.217941}}
       		       	},
       		       ],
       		       hotel: {
       		       	name: 'union',
       		             isPublicHotel: false,
                            }
	       		}],
       owner: 1,
       shared: [2,3],
       city:{
       	name: "city",
       	location: {
       		lat: 40.1164204,
       		lng: -88.24338290000003
       	}
       },
       description: "A trip with family and dogs and cats and birds and bananas!!!",
       name: 'Thanksgiving Trip'
      },
       {
       id: 2,
       startDate: "2019-12-16T03:24:00",
       duration: 2,
       routes: [{
	       		   day: 0,
       		       activities:[
       		       {
       		       		name: 'sleep',
       		       		location: 'union',
       		       		isPopularActivity: false,
										geometry:{location: {lat: 40.119661, lng: -88.242426}}
       		       	},
       		       	{
       		       		name: 'walk',
       		       		location: 'quad',
       		       		isPopularActivity: true,
										geometry:{location: {lat: 40.107677, lng: -88.227220}}
       		       	},
       		       ],
       		       hotel: {
       		       	name: 'home',
       		             isPublicHotel: false,
                            }
	       		},
	       		{
	       		   day: 1,
       		       activities:[
       		       {
       		       		name: 'eat',
       		       		location: 'black dog',
       		       		isPopularActivity: true,
										geometry:{location: {lat: 40.118222, lng: -88.240011}}
       		       	},
       		       	{
       		       		name: 'play frisbee',
       		       		location: 'japan house',
       		       		isPopularActivity: true,
										geometry:{location: {lat: 40.093110, lng: -88.217941}}
       		       	},
       		       ],
       		       hotel: {
       		       	name: 'union',
       		             isPublicHotel: false,
                            }
	       		}
       ],
       owner: 1,
       shared: [2,3],
       city:{
       	name: "city",
       	location: {
       		lat: 40.1164204,
       		lng: -88.24338290000003
       	}
       },
       description: "A trip with family and dogs and cats and birds and bananas!!!",
       name: 'Christmas Trip'
      },
       {
       id: 3,
       startDate: "2016-12-06T03:24:00",
       duration: 6,
       routes: [{
	       		   day: 0,
       		       activities:[
       		       {
       		       		name: 'sleep',
       		       		location: 'union',
       		       		isPopularActivity: false,
										geometry:{location: {lat: 40.119661, lng: -88.242426}}
       		       	},
       		       	{
       		       		name: 'walk',
       		       		location: 'quad',
       		       		isPopularActivity: true,
										geometry:{location: {lat: 40.107677, lng: -88.227220}}
       		       	},
       		       ],
       		       hotel: {
       		       	name: 'home',
       		             isPublicHotel: false,
                            }
	       		},
	       		{
	       		   day: 1,
       		       activities:[
       		       {
       		       		name: 'eat',
       		       		location: 'black dog',
       		       		isPopularActivity: true,
										geometry:{location: {lat: 40.118222, lng: -88.240011}}
       		       	},
       		       	{
       		       		name: 'play frisbee',
       		       		location: 'japan house',
       		       		isPopularActivity: true,
										geometry:{location: {lat: 40.093110, lng: -88.217941}}
       		       	},
       		       ],
       		       hotel: {
       		       	name: 'union',
       		             isPublicHotel: false,
                            }
	       		}
       ],
       owner: 1,
       shared: [2,3],
       city:{
       	name: "city",
       	location: {
       		lat: 40.1164204,
       		lng: -88.24338290000003
       	}
       },
       description: "A trip with family and dogs and cats and birds and bananas!!!",
       name: 'December Trip'
      },
       {
       id: 4,
       startDate: "2019-06-23T03:24:00",
       duration: 8,
       routes: [{
	       		   day: 0,
       		       activities:[
       		       {
       		       		name: 'sleep',
       		       		location: 'union',
       		       		isPopularActivity: false,
						geometry:{location: {lat: 40.119661, lng: -88.242426}}
       		       	},
       		       	{
       		       		name: 'walk',
       		       		location: 'quad',
       		       		isPopularActivity: true,
						geometry:{location: {lat: 40.107677, lng: -88.227220}}
       		       	},
       		       ],
       		       hotel: {
       		       	name: 'home',
       		             isPublicHotel: false,
                            }
	       		},
	       		{
	       		   day: 1,
       		       activities:[
       		       {
       		       		name: 'eat',
       		       		location: 'black dog',
       		       		isPopularActivity: true,
						geometry:{location: {lat: 40.118222, lng: -88.240011}}
       		       	},
       		       	{
       		       		name: 'play frisbee',
       		       		location: 'japan house',
       		       		isPopularActivity: true,
					       geometry:{location: {lat: 40.093110, lng: -88.217941}}
       		       	},
       		       ],
       		       hotel: {
       		       	name: 'union',
       		             isPublicHotel: false,
                                  //
                            }
	       		}
       ],
       owner: 1,
       shared: [2,3],
       city:{
       	name: "city",
       	location: {
       		lat: 40.1164204,
       		lng: -88.24338290000003
       	}
       },
       description: "A trip with family and dogs and cats and birds and bananas!!!",
       name: 'Winter Break Trip'
      },
    ]
