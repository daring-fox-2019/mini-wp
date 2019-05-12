<template>
  <v-layout>
    <FullView v-if="showForm" :article-id="articleIdClicked"></FullView>
    <v-flex xs12 sm12 v-show="!showForm">
      <v-card v-for="article in articles" v-bind:key="article.id" class="mb-3">
        <v-img class="white--text" height="200px" :src="getBanner(article.image)">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{article.title}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <v-layout justify-space-between align-center fill-height>
            <v-flex xs12 sm6>
              <div>
                <span class="grey--text">{{formatDate(article.createdAt)}}</span>
                <br>
                <span class="headline">{{article.title}}</span>
                <br>
              </div>
            </v-flex>
            <v-flex xs12 sm6>
              <div class="right align-content-center">
                <span class="caption grey--text right">Author</span>
                <br>
                <span class="right">{{article.author.name}}</span>
              </div>
            </v-flex>
            <v-flex xs6 sm1>
              <v-avatar size="40px" class="mx-2">
                <img src="/trianglify.svg" alt>
              </v-avatar>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click="showDetail(article._id)">Read More</v-btn>
          <v-btn flat color="orange">Share</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import { async } from "q";
import moment from "moment";
import FullView from "@/components/FullView";
export default {
  data() {
    return {
      articles: [],
      date: moment(this.createdAt)
        .startOf("day")
        .fromNow(),
      articleIdClicked: "",
      showForm: false
    };
  },
  mounted() {
    axios({
      url: "http://localhost:3000/articles/all",
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(allArticles => {
        this.articles = allArticles.data.reverse();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    formatDate(date) {
      let formatted = moment(date).format();
      return moment(formatted)
        .startOf("minute")
        .fromNow();
    },
    getBanner(image) {
      if (image) {
        return image;
      } else {
        return "https://source.unsplash.com/random/1137x200";
      }
    },
    showDetail(id) {
      this.articleIdClicked = id;
      this.showForm = true;
      console.log(this.articleIdClicked);
      console.log(this.showForm);
    }
  },
  components: {
    FullView
  }
};
</script>

