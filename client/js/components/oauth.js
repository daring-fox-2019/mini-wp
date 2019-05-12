Vue.component('dd-oauth', {
  data() {
    return {
      oauthForm: {
        valid: false,
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
      this.oauthForm.password = '';
    },

    registerOauth() {
      const { password } = this.oauthForm;
      const formData = {
        password
      }
      this.resetForm();
      this.$emit('register-oauth', formData);
    }
  },
  
  template: `
  <div>
    <span class="title">Last step, enter password...</span>
    <v-form @submit.prevent="registerOauth" v-model="oauthForm.valid">
      <v-text-field
        v-model="oauthForm.password"
        :rules="oauthForm.passwordRules"
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