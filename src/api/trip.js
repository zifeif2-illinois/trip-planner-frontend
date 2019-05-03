import axios from 'axios'

tripUrl = ""

export function createNewTrip(trip) {
	axios.post(tripUrl, trip )
		.then((data) => {

		})
}