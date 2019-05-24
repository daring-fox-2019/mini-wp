Vue.component('form-login', {
    data() {
      return {
        user: {
          email:'',
          password:'',
        }
      }
    },
    methods: {
      loginUser() {
        this.$emit('user-login', this.user);
        this.user = {
          email: '',
          password: '',
        }
      }
    },
    template: `
    <div id="login">
                <h3>Login</h3>
                <form>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                    </div>
                    <div id="localsign">
                        <button type="submit" class="btn btn-dark btn-sm" @click="loginUser">login</button>
                        <a href="#" style="text-decoration:none;margin-left:50%;" @click="showregister">already register?</a>
                    </div>
                    <br>
                    <div id="googleSign">
                        <h6 style="text-align:center;"><i>or login with your google account</i></h6>
                    </div>
                </form>
    </div>
      <div>
      <h1 class="text-center">Form Input</h1>
      <form
        method="post"
        class="col border p-4"
        v-on:submit.prevent="addNinja">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            v-model="ninja.title"
            type="text"
            name="title"
            autocomplete="off"
            class="form-control">
        </div>
        <div class="form-group">
          <label for="image">Image</label>
          <input
            v-model="ninja.image"
            type="text"
            name="image"
            autocomplete="off"
            class="form-control">
        </div>
        <div class="form-group">
          <label for="name">Created</label>
          <input
            v-model="ninja.created"
            type="text"
            name="name"
            autocomplete="off"
            class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
    `
  })