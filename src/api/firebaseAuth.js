import { fbAuth, firebase} from '../firebase.js'
import axios from 'axios';
const USER_URL = 'https://us-central1-cs498rk-239014.cloudfunctions.net/user/'
// const USER_URL = "http://localhost:5000/cs498rk-239014/us-central1/user"


export function getCurrentUser() {
  return fbAuth.currentUser;
}

export function login(userEmail, userPassword) {
    return fbAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(()=> fbAuth.signInWithEmailAndPassword(userEmail, userPassword)
      .then((data) => ({user: data['user']}))
      .catch(function(error) {
      	console.log(error)
       	return {error: error.toString()};
    }));
}


export function register( userEmail, userPassword, name ) {
  return fbAuth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then(function(data) {
        let user = data['user']
        return axios.post(USER_URL, {
          name: name,
          email: userEmail
        }).then(response => {
          return {user:response.data.data}
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
