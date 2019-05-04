import { fbAuth} from '../firebase.js'
import axios from 'axios';
const USER_URL = 'https://us-central1-cs498rk-239014.cloudfunctions.net/user/'


export function getCurrentUser() {
  return fbAuth.currentUser;
}

export function login(userEmail, userPassword) {
    return fbAuth.signInWithEmailAndPassword(userEmail, userPassword)
      .then((data) => ({user: data['user']}))
      .catch(function(error) {
      	console.log(error)
       	return {error: error.toString()};
    });
}


export function register( userEmail, userPassword, name ) {
  return fbAuth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then(function(data) {
        let user = data['user']
        axios.post(USER_URL, {
          name: name,
          email: userEmail
        }).then(response => {
          return response.data
        });
      })
      .catch(function(error) {
        return {user: null, error: error.toString()};
      })
}

export function logout() {
  return fbAuth.signOut()
}

export function resetPassword(email) {
  return fbAuth.sendPasswordResetEmail(email)
}
