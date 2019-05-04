import { getCurrentUser } from './firebaseAuth.js'
import axios from 'axios'

// const userUrl = "http://localhost:5000/cs498rk-239014/us-central1/user"
const userUrl = "https://us-central1-cs498rk-239014.cloudfunctions.net/user"

export function getCurrentUserId() {
	return getCurrentUser().email;
}
const dummyUsers = [{name: 'Jack', email: 'jacky@example.com'},{name: 'Mary', email: 'mary@example.com'},{name: 'Amy', email: 'amy@example.com'}]
export function getAllUsers() {
	// return new Promise((resolve, reject) => resolve(dummyUsers))
	return axios.get(`${userUrl}/`)
		.then((data) => {
			return data.data.data
		})
}
