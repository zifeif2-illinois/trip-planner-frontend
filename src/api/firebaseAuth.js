import { fbAuth} from '../firebase.js'

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


export function register( userEmail, userPassword ) {
  return fbAuth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then(function(data) {
        if(data['user']) {
          return {user: data['user']}
        }
      })
      .catch(function(error) {
        return {user: null, error: error.toString()};
      })
}

export function logout() {
  return fbAuth.signOut()
}
