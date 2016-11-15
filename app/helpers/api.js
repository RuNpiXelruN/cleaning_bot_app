import { ref } from 'config/constants'

export function fetchUsers () {
  return ref.child(`users`).once('value')
    .then((snapshot) => console.log(snapshot.val()))
}
