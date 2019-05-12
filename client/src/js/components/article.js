Vue.component("article-component", {
  props: ["article"],
  data() {
    return {
    }
  },
  computed: {
    date() {
      return new Date(this.article.createdAt).toDateString().slice(3);
    },
  },
  methods: {
    readMore(selectedArticle) {
      this.$emit("read-more", selectedArticle);
    },

    updateSearch(value) {
      this.$emit("update-search", value);
    }
  },
  template: `
    <div class="card" id="card-article">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="article.featuredImage" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="article.userId.displayPicture" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ article.userId.fullName }}</p>
            <p class="subtitle is-6">@{{ article.userId.username }}</p>
          </div>
        </div>

        <div class="content" style="margin-bottom: 0;">
          <h3 style="margin-bottom: 0;">{{ article.title }}</h3>
        </div>

        <div class="content article-list" v-html="article.content">
        </div>
        <b-button type="is-success" @click="readMore(article)">Read more...</b-button>
        <div class="content">
        </div>
        <hr>
        <div class="content subtitle">{{ date }}</div>
        <div class="content" style="display: flex;">

          <div class="columns is-multiline">
            <div class="column is-auto" v-for="(tag, index) in article.tags" :key="index">
              <b-button class="mr-2" rounded @click="updateSearch(tag)">#{{ tag }}</b-button>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
});