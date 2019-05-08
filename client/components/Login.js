Vue.component('login', {
  props: ['isLogin'],
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
    }
  },
  methods: {
    login() {
      console.log('.asuk');
      
      Axios.post(`users/signin/local`, {
        email: this.loginEmail,
        password: this.loginPassword
      })
      .then(response => {
        let { data } = response
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data._id)
        localStorage.setItem('username', data.username)
        localStorage.setItem('userImage', data.image)

        
        Swal.fire(
          'Good day!',
          'Enrich yourself today',
          'success'
        )

        console.log(response, 'apapapapa')
        this.$emit('sign-in', data.image)
      })
      .catch(function (err, textStatus) {
        console.log(err);
        
        swal({
          text: 'Please check your credentials',
          icon: "warning",
          button: "Understood",
        })
      })
    }
  }, template: `
    <div class="container">
  <div class="row">
    <div class="col"></div>
    <div class="col-6">
      <form @submit.prevent=login> 

        <div class="form-group">
            <label for="loginEmail">Email address</label>
            <input v-model="loginEmail" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label for="loginPassword">Password</label>
            <input  v-model="loginPassword" type="password" class="form-control"  placeholder="Password">
        </div>
         <button type="submit" class="mt-2 btn btn-primary">Submit</button>
        </form>
    </div>
    <div class="col"></div>
  </div>
</div>`
})