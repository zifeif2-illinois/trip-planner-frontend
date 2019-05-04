import { getCurrentUser } from './firebaseAuth.js'


export function getCurrentUserId() {
	return getCurrentUser().email;
}
const dummyUsers = [{name: 'Jack', email: 'jacky@example.com'},{name: 'Mary', email: 'mary@example.com'},{name: 'Amy', email: 'amy@example.com'}]
export function getAllUsers() {
	return new Promise((resolve, reject) => resolve(dummyUsers))
}

export function shareTrip(tripId, listOfUserEmails) {

}
