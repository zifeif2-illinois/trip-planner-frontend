var currentUserId = 1; // need to populate from data base

export function getCurrentUserId() {
	return currentUserId;
}
const dummyUsers = [{name: 'Jack', email: 'jacky@example.com'},{name: 'Mary', email: 'mary@example.com'},{name: 'Amy', email: 'amy@example.com'}]
export function getAllUsers() {
	return new Promise((resolve, reject) => resolve(dummyUsers))
}

export function shareTrip(tripId, listOfUserEmails) {

}
