Vue.component('dd-register', {
  data() {
    return {
      registerForm: {
        valid: false,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 30 || 'Name must be less than 30 characters'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Password must contain at least 6 characters'
        ]
      },
    };
  },

  methods: {
    resetForm() {
      this.registerForm.name = '';
      this.registerForm.email = '';
      this.registerForm.password = '';
    },

    register() {
      const { name, email, password } = this.registerForm;
      const formData = {
        name, email, password
      }
      this.resetForm();
      this.$emit('register', formData);
    }
  },
  
  template: `
  <div>
    <span class="display-1">Register</span>
    <v-form @submit.prevent="register" v-model="registerForm.valid">
      <v-text-field
        v-model="registerForm.name"
        :rules="registerForm.nameRules"
        :counter="30"
        label="Full name"
        required
      ></v-text-field>
      <v-text-field
        v-model="registerForm.email"
        :rules="registerForm.emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="registerForm.password"
        :rules="registerForm.passwordRules"
        :counter="6"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <a @click="$emit('login')">Have an account? Login here</a>
      <v-layout class="mt-3" justify-end row>
        <v-btn type="submit" flat color="green">Submit <v-icon>send</v-icon></v-btn>
      </v-layout>
    </v-form>
  </div>
  `
})