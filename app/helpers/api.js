import { ref } from 'config/constants'

export function fetchUsers () {
  return ref.child(`users`).once('value')
    .then((snapshot) => snapshot.val())
}
