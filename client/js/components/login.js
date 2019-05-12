Vue.component('dd-login', {
  data() {
    return {
      loginForm: {
        valid: false,
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
        ]
      },
    };
  },
  
  methods: {
    resetForm() {
      this.loginForm.email = '';
      this.loginForm.password = '';
    },

    login() {
      const { email, password } = this.loginForm;
      const formData = {
        email, password
      }
      this.resetForm();
      this.$emit('login', formData);
    }
  },
  
  template: `
  <div>
    <span class="display-1">Login</span>
    <v-form @submit.prevent="login" v-model="loginForm.valid">
      <v-text-field
        v-model="loginForm.email"
        :rules="loginForm.emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="loginForm.password"
        :rules="loginForm.passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <a @click="$emit('register')">Don't have an account? Register here</a>
      <v-layout class="mt-3" justify-end row>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
        <v-btn type="submit" flat color="green">Submit <v-icon>send</v-icon></v-btn>
      </v-layout>
    </v-form>
  </div>
  `
})