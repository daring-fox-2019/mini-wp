Vue.component('register', {
    data() {
        return {
          form: {
            first_name : '',
            last_name : '',
            email: '',
            password: '',
          },
          show: true
        }
      },
      methods: {
        toRegister(){
            this.$emit('to-register', false)
        },
        onSubmit() {
          axios.post(`${url}/users/register`,{name: `${this.form.first_name} ${this.form.last_name}`,email: this.form.email, password: this.form.password})
          .then( ({data}) => {
            Swal.fire({
                title: 'Registration Success',
                text: `continue to login page ->`,
                type: 'success',
                showConfirmButton: false
            })
          })
          .catch(err => {
            Swal.fire({
                title: 'Sign Up error',
                text: `${err.response.data.message}`,
                type: 'error',
                showConfirmButton: false
            })
          })
        }
    },
    template : `
    <div class="container animated fadeIn" style="margin-top:100px;width:30%;padding-bottom:100px" >
        <b-form @submit.prevent="onSubmit" v-if="show">
        <div class="row">
            <div class="col">
                <b-form-group
                    
                    id="input-group-1"
                    label="First Name:"
                    label-for="input-1"
                >

                    <b-form-input
                    id="input-1"
                    v-model="form.first_name"
                    type="text"
                    required
                    placeholder="Enter First Email"
                    ></b-form-input>
                
                </b-form-group>
            </div>

            <div class="col">
                <b-form-group
                    id="input-group-2"
                    label="Last Name:"
                    label-for="input-2"
                >

                    <b-form-input
                    id="input-2"
                    v-model="form.last_name"
                    type="text"
                    required
                    placeholder="Enter Last Email"
                    ></b-form-input>

                </b-form-group>
            </div>
        </div>
        <b-form-group
            id="form-email"
            label="Email address:"
            label-for="email"
            description="We'll never share your email with anyone else."
        >
            <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="form-passoword" label="Password:" label-for="password">
            <b-form-input
            id="password"
            v-model="form.password"
            required
            type="password"
            placeholder="Enter password"
            ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" block> Sign Up</b-button>
        </b-form>
        <hr>
        <p> have an account ? </p>
        <b-button type="submit" variant="outline-success" block size="sm" @click="toRegister">  <i class="fas fa-torii-gate"></i> Login </b-button>
        <b-button type="submit" variant="outline-success" block size="sm" @click="$parent.toMainPage()"> Main Page <i class="fas fa-arrow-right"></i> </b-button>
        
    </div>
    `
})