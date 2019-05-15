function googleLogin( googleUser ) {
  console.log( "kepanggil" )
  const idToken = googleUser.getAuthResponse().id_token;
  axios( {
      method: "post",
      url: "http://35.240.148.150/googleLogin",
      headers: {
        token: idToken
      }
    } )
    .then( ( {
      data
    } ) => {
      console.log( data )
      localStorage.setItem( 'token', data.token )
      localStorage.setItem( 'email', data.email )
      localStorage.setItem( 'id', data.id )
      localStorage.setItem( 'user', data.name )
      console.log( "berhasil login nih" )
      swal( "Success", `hello ${data.name}!`, "success" )
      vue.checklogin()
    } )
    .catch( error => {
      console.log( "catch" )
      swal( "Info", `username / password incorrect`, "warning" )
      console.log( error )
    } )
}