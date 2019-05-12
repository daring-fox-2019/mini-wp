Vue.component('dd-oauth', {
  data() {
    return {
      oauth: {
        valid: false,
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Password must contain at least 6 characters'
        ]
      },
    };
  },
  
  template: `
  <div>
    <span class="title">Last step, enter password...</span>
    <v-form v-model="oauth.valid">
      <v-text-field
        v-model="oauth.password"
        :rules="oauth.passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-layout class="mt-3" justify-end row>
        <v-btn type="submit" flat color="green">Submit <v-icon>send</v-icon></v-btn>
      </v-layout>
    </v-form>
  </div>
  `
})