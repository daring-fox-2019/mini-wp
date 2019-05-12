<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon class="accent--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">flat</span>
        <span class="accent--text">wp</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="grey" @click="removeTokens">
        <span>Sign Out</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="accent">
      <v-layout
        column
        align-center
        class="primary"
        style="background-image: url('/trianglify3.svg');"
      >
        <v-flex class="my-5" style="text-align: center">
          <v-avatar size="100">
            <img src="https://api.adorable.io/avatars/100/abott@adorable.png" alt="user">
          </v-avatar>
          <p class="white--text subheading mt-1">hello, {{name}}</p>
          <p class="white--text caption mt-1">{{email}}</p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Swal from "sweetalert2";
import PopupForm from "@/components/PopupForm";
export default {
  data() {
    return {
      drawer: true,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "dashboard", text: "Dashboard", route: "/dashboard" }
      ]
    };
  },
  components: {
    PopupForm
  },
  methods: {
    removeTokens() {
      Swal.fire({
        title: "Are you sure?",
        text: "It's sad to see you leave",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          localStorage.removeItem("email");
          Swal.fire("Bye!", "Till we meet again", "success");
          this.$emit("logout");
        }
      });
    },
    emitUpdate() {
      this.$emit("updated");
    }
  }
};
</script>
