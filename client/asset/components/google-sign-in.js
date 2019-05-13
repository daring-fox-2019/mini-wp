Vue.component('g-signin-button', {
    template: `
      <a ref="signinBtn" class="g-signin2"> <button @submit.prevent type="button" class="btn btn-outline-dark btn-sm mb-2" style="width:100%"> <i class="fab fa-google"></i> Sign in with google</button></a>
    `,
    mounted() {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: '1047288130299-qnimdphrt0ksuu1km60qfn8sdu7daq6v.apps.googleusercontent.com'
        })
        auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
          this.$emit('done', googleUser)
        }, error => console.log(error))
      })
    }
  })