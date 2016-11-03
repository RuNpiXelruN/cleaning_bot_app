import { ref, firebaseAuth } from 'config/constants'

export default function auth () {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
}

// export default function auth () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve ({
//         name: 'Justin Davidson',
//         avatar: 'https://facebook.github.io/react/img/logo.svg',
//         uid: 'UIDjustindavidson',
//       })
//     }, 1000)
//   })
// }

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed
}

export function logout () {
  return firebaseAuth().signOut()
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`).set(user)
    .then(() => user)
}
