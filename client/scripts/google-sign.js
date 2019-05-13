function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    let token = googleUser.getAuthResponse().id_token

    axios
    .post(`${serverUrl}/users/google-login`, { token })
    .then(({ data }) => {
        console.log('google sign in success')
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', data.name)
        localStorage.setItem('email', data.email)
        localStorage.setItem('_id', data._id)
        Swal.fire({
            type: 'success',
            title: 'Login success',
            text: 'Welcome to Mini WP!',
            timer: 1500
        })
        app.hideLoginModal()
        app.show.login = true;
    })
    .catch(err => {
        console.log(err.response)
    })
}
  

function signOut() {
    Swal.fire({
        title: 'Do you want to log out?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
    })
    .then((result) => {
        if (result.value) {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
                
                app.show.login = false;
            });
            localStorage.clear()
            app.show.page = 'home'
            app.show.login = false
            Swal.fire(
                'Logged out!',
                'See you again.',
                'success'
            )
          
    }})
}
