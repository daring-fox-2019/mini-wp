<template>
  <div>
    <v-card flat :class="'status '+status">
      <Alert v-bind="alert" v-show="showAlert"></Alert>
      <v-layout row wrap class="pa-3">
        <v-flex xs6 sm4 md4>
          <div class="caption grey--text">Title</div>
          <div>
            <a class="art-title" @click="showForm(_id)">{{title}}</a>
          </div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Author</div>
          <div>{{author.name}}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Created</div>
          <div>{{formatDate(createdAt)}}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <v-btn flat icon color="pink" @click="$emit('requestEdit', _id)">
            <v-icon small>edit</v-icon>
          </v-btn>
          <v-btn flat icon color="pink" @click="deleteArticle(_id)">
            <v-icon small>delete</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="right">
            <v-chip
              @click="showForm(_id)"
              small
              :class="`${status} white--text caption my-2`"
            >{{status}}</v-chip>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import Axios from "axios";
import Alert from "@/components/Alert";
import { setTimeout } from "timers";
import Swal from "sweetalert2";
export default {
  props: {
    _id: String,
    title: String,
    createdAt: String,
    content: String,
    author: Object,
    status: String
  },
  data() {
    return {
      alert: {
        alertType: "success",
        message: ""
      },
      showAlert: false
    };
  },
  methods: {
    showForm(id) {},
    deleteArticle(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Axios({
            url: "http://localhost:3000/articles/" + id,
            method: "DELETE",
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(deleted => {
              this.$emit("updated");
              this.alert.alertType = "warning";
              this.alert.message = "successfully delete 1 data";
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 3000);
            })
            .catch(err => {
              this.alert.alertType = "error";
              this.alert.message = "unknown error";
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 3000);
            });
        }
      });
    },
    editArticle(id) {},
    formatDate(date) {
      let formatted = moment(date).format();
      return moment(formatted)
        .startOf("minute")
        .fromNow();
    }
  },
  components: {
    Alert
  }
};
</script>
<style>
.status.published {
  border-left: 4px solid #3cd1c2;
}
.status.unpublished {
  border-left: 4px solid orange;
}
.v-chip.published {
  background: #3cd1c2;
}
.v-chip.unpublished {
  background: orange;
}
.art-title:hover {
  color: red;
}
.v-chip:hover {
  background: grey;
}
</style>


