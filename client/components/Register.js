Vue.component('register', {
    props : [],
    data() {
      return {
        registerUsername : '',
        registerEmail : '',
        registerPassword : '',
        registerProfpic : '',
        image : null,
        imageUrl :null,
      }
    },
    methods: {
      getImage(event) {
        this.image = event.target.files[0]
        console.log('disini', this.image, '//////////');  
  
      },
       register() {
          let formData = new FormData()
          formData.append('username', this.registerUsername)
          formData.append('email', this.registerEmail)
          formData.append('password', this.registerPassword)
          formData.append('image', this.image)
          console.log(formData, 'ini form data')
          Axios.post(`/users/register`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              }
            })
            .then(created => {
              Swal.fire(
                'Registered',
                'You may login now',
                'success'
              )
              
            })
            .catch(err => {
              console.log(err);
              
              // let errors = ''
              // for (let keys in err.responseJSON.err.errors) {
              //   if (err.responseJSON.err.errors[keys].message) {
              //     errors += `${err.responseJSON.err.errors[keys].message} \n`
              //   }
              // }
              Swal.fire(
                'Error',
                'Cannot register',
                'error'
              )
            })
          },

            // Axios.post(`/users/register`, {
            //     username: this.registerUsername,
            //     email: this.registerEmail,
            //     password: this.registerPassword,
            //     profilePicture : this.registerProfpic
            //   })
            //   .then(created => {
            //     Swal.fire(
            //       'Registered',
            //       'You may login now',
            //       'success'
            //     )
                
            //   })
            //   .catch(err => {
            //     console.log(err);
                
            //     // let errors = ''
            //     // for (let keys in err.responseJSON.err.errors) {
            //     //   if (err.responseJSON.err.errors[keys].message) {
            //     //     errors += `${err.responseJSON.err.errors[keys].message} \n`
            //     //   }
            //     // }
            //     Swal.fire(
            //       'Error',
            //       'Cannot register',
            //       'error'
            //     )
            //   })
    },
    template : `
    
    <div class="container">
  <div class="row">
    <div class="col"></div>
    <div class="col-6">
      <form @submit.prevent=register >

        <div class="form-group">
            <label for="registerUsername">Username</label>
            <input v-model="registerUsername" type="text" class="form-control" id="registerUsername" aria-describedby="usernameHelp" placeholder="Enter username">
        </div>
        <div class="form-group">
            <label for="registerEmail">Email address</label>
            <input v-model="registerEmail" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label for="registerPassword">Password</label>
            <input v-model="registerPassword" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
            <label for="profilePicture">Profile Picture</label>
            <div class="custom-file">
                <input v-on:change="getImage" type="file" class="custom-file-input" id="customFile">
                <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
         <button type="submit" class="mt-4 btn btn-primary">Submit</button>
        </form>
    </div>
    <div class="col"></div>
  </div>
</div>`
})
    
    