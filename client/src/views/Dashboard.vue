<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Your Posts</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon left small>sort_by_alpha</v-icon>
            <span class="caption text-lowercase">By Title</span>
          </v-btn>
          <span>sort by title</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('createdAt')" slot="activator">
            <v-icon left small>date_range</v-icon>
            <span class="caption text-lowercase">By Date</span>
          </v-btn>
          <span>sort by date</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('status')" slot="activator">
            <v-icon left small>done</v-icon>
            <span class="caption text-lowercase">By Status</span>
          </v-btn>
          <span>sort by status</span>
        </v-tooltip>
      </v-layout>

      <ArticleCard
        v-model="articles"
        v-for="(article) in articles"
        :key="article.id"
        v-bind="article"
        v-on:updated="getData"
        v-on:requestEdit="showEdit"
      ></ArticleCard>
      <PopupForm v-on:updated="getData"></PopupForm>
    </v-container>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";
import axios from "axios";
import PopupForm from "@/components/PopupForm";
export default {
  data() {
    return {
      articles: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    sortBy(prop) {
      this.articles.sort((a, b) => {
        a[prop] > b[prop] ? 1 : -1;
      });
    },
    getData() {
      axios({
        url: "http://localhost:3000/articles",
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(articles => {
          this.articles = articles.data.reverse();
        })
        .catch(err => {});
    },
    showEdit(id) {}
  },
  components: {
    ArticleCard,
    PopupForm
  }
};
</script>
