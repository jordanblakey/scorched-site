document.addEventListener('DOMContentLoaded', function() {
  try {
    let app = firebase.app()
    let features = ['auth', 'database', 'messaging', 'storage'].filter(
      feature => typeof app[feature] === 'function'
    )
    document.getElementById(
      'load'
    ).innerHTML = `Firebase SDK loaded with ${features.join(', ')}`

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION) // SESSION, LOCAL, NONE
    firebase.firestore().settings({ timestampsInSnapshots: true })
  } catch (e) {
    console.error(e)
    document.getElementById('load').innerHTML =
      'Error loading the Firebase SDK, check the console.'
  }
})
