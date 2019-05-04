export const DUMMY_TRIP = {
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
                geometry:{location: {lat: 40.118222, lng: -88.240011}}
              },
              {
                name: 'play frisbee',
                location: 'japan house',
                isPopularActivity: true,
                geometry:{location: {lat: 40.093110, lng: -88.217941}} // Testing map purpose. Personal Activity doens't have geometry
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
     cityLocation: {lat: 40.1179, lng:-88.2293},
     description: "A trip with family and dogs and cats and birds and bananas!!!",
     name: 'Christmas Trip'
    }
