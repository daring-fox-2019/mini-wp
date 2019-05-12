<template>
  <v-app class="grey lighten-4">
    <Login v-if="!isLogin" v-on:login="checkLogin"></Login>
    <Navbar v-if="isLogin" v-on:logout="checkLogin" v-on:updated="update"></Navbar>
    <v-content class="mx-4 mb-4" v-if="isLogin">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Login from "@/components/Login";
export default {
  name: "App",
  data() {
    return {
      isLogin: !true
    };
  },
  components: {
    Navbar,
    Login
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("token")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    update() {
      console.log("updated");
    }
  }
};
</script>
