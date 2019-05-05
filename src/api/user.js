import { getCurrentUser } from './firebaseAuth.js'
import axios from 'axios'

// const userUrl = "http://localhost:5000/cs498rk-239014/us-central1/user"
const userUrl = "https://us-central1-cs498rk-239014.cloudfunctions.net/user"

export function getCurrentUserId() {
	return getCurrentUser().email;
}
export function getAllUsers() {
	// return new Promise((resolve, reject) => resolve(dummyUsers))
	return axios.get(`${userUrl}/`)
		.then((data) => {
			return data.data.data
		})
}

export function getUserById(userId) {
	return axios.get(`${userUrl}/${userId}`)
			.then((data) => {
				return data.data.data
			})
}

export function updateUser(userId, newAttrs) {
	console.log(newAttrs)
	return axios.put(`${userUrl}/${userId}`, newAttrs)
}