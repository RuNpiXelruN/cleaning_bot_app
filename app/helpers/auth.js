export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve ({
        name: 'Justin Davidson',
        avatar: 'https://facebook.github.io/react/img/logo.svg',
        uid: 'UIDjustindavidson',
      })
    }, 1000)
  })
}
