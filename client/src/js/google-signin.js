function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  axios({
    type: "POST",
    url: "http://localhost:3000/api/google-login",
    headers: {
      token: id_token,
    }
  })
    .then(({ data }) => {
      app.login(data);
    })

    .catch(err => {
      console.log(err);
    });
}

function googleSignOut() {
  console.log(gapi.auth2.getAuthInstance());
  if (gapi.auth2.getAuthInstance()) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

}