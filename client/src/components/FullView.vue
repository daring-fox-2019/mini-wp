<template>
  <v-card flat>
    <v-container fill-height>
      <v-layout row wrap>
        <v-card-title>
          <p class="display-2">{{article.title}}</p>
          <div class="subheading">
            <v-icon small pink>person</v-icon>
            {{article.author.name}}
          </div>
          <br>
          <div class="caption ml-3">
            <v-icon small pink>access_time</v-icon>
            {{formatDate(article.createdAt)}}
          </div>
        </v-card-title>
        <v-card-text>
          <div v-html="article.content"/>
        </v-card-text>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
export default {
  data() {
    return {
      article: {}
    };
  },
  props: ["articleId"],
  created() {
    console.log(this.articleId);
    axios({
      url: "http://localhost:3000/articles/" + this.articleId,
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(article => {
        console.log(article);
        this.article = article.data;
      })
      .catch(err => {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: err,
          footer: "<a href>Why do I have this issue?</a>"
        });
      });
  },
  methods: {
    formatDate(date) {
      let formatted = moment(date).format();
      return moment(formatted)
        .startOf("minute")
        .fromNow();
    }
  }
};
</script>



