function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    axios
        .post(`http://localhost:3000/users/googleSignIn`, { token: id_token })
        .then(({ data }) => {
            const { details, userToken } = data
            const { id, email } = details
            if (!localStorage.getItem('token')) swal("Success!", `Welcome back, ${data.details.email}!`, "success")
            app.condition = 'login'
            app.email = email
            localStorage.setItem('token', userToken)
            localStorage.setItem('UserId', id)
            localStorage.setItem('email', email)
        })
        .catch((err) => {
            console.log(err)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}