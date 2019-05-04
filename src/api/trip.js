import axios from 'axios'
// import {sharedDummyTrip} from './dummy-for-shared'
import {getCurrentUserId} from './user'
const tripUrl = "https://us-central1-cs498rk-239014.cloudfunctions.net/trip"
const userUrl = "https://us-central1-cs498rk-239014.cloudfunctions.net/user"
// const tripUrl = "http://localhost:5000/cs498rk-239014/us-central1/trip"
// const userUrl = "http://localhost:5000/cs498rk-239014/us-central1/user"
export function createNewTrip(trip) {
	dummyTrips.push(trip)
       return axios.post(tripUrl,{data:JSON.stringify(trip)})
              .then((data) => {
                     console.log(data.data)
                     return data.data.id
              })

}


export function updateTrip(tripId, updatedTrip) {
	return axios.put(`${tripUrl}/${tripId}`,{data:JSON.stringify(updatedTrip)})
              .then((data) => {
                     console.log(data.data)
                     return data.data.id
              })
}

export function getTripsByUserId(userId){
	return axios.get(`${userUrl}/gettrip/${userId}`)
              .then((data)=>{
                     let allTrips = data.data.data
                     return allTrips
                     
              })
}


export function shareTrip(tripId, listOfUsers) {
       // axios.put(`${tripUrl}/${tripId}`,{data: {shared: listOfUsers}})
       //                                        .then((data) => {
       //                                                              return data.data.id
       //                                        })
       return updateTrip(tripId, {shared: listOfUsers})
}


export function getTrips(){
       return axios.get(`${userUrl}/gettrip/${getCurrentUserId()}`)
                     .then((data)=>{
                     let allTrips = data.data.data
                     return allTrips
                     })
}

export function getSharedTrips() {
	return axios.get(`${tripUrl}/shared/${getCurrentUserId()}`)
              .then((data)=>{
                     console.log(data.data.data)
                     return data.data.data
              })
}


export function getTripById(tripId) {
       return axios.get(`${tripUrl}/${tripId}`)
              .then((data)=>{
                     console.log(data.data.data)
                     return data.data.data
              })

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
       owner: 2,
       shared: [1,3],
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
