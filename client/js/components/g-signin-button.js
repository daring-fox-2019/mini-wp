Vue.component('g-signin-button', {
    template: `
      <a ref="signinBtn" 
      class="g-signin2 ui fluid large black submit button">
      <i class="fa fa-google">
      </i> <p>Sign in with google</p></a>
    `,
    mounted() {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: '563252494522-hccd5ve2teth35uns0s1hckah9dqr0nb.apps.googleusercontent.com'
        })
        auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
          this.$emit('google', googleUser)
        }, error => console.log(error))
      })
    }
  })