Vue.component('article-detail', {
    props: {
        article: Object,
        userEmail: String
    },
    methods: {
    },
    template: `
    <div class="ui basic segment container">
          <h1 class="ui centered header">{{ article.title }}</h1>
          <h4 class="ui horizontal divider">
            {{ article.subtitle }}
          </h4>
          <h2 class="ui centered sub header">
            {{ article.owner.name }}
            <p>{{ $parent.createdAt(article.created_at) }}</p>
          </h2>
          <br />
          <div class="ui fluid large centered image">
            <img :src="article.featured_image === 'https://www.seaharvest.net.au/wp-content/themes/seaharvest/img/assets/built/compass-blue.png' ? '' : article.featured_image" alt="" />
          </div>
          <br />
          <div v-html="article.content"></div>
          <br />
          <div class="ui basic labels">
            <a
              class="ui label"
              v-for="(tag, i) in article.tags"
              :key="i"
              @click="$parent.fetchArticles(tag)"
            >
              {{ tag }}
            </a>
          </div>
          <template v-if="userEmail == article.owner.email">
            <div class="ui right floated icon buttons">
              <button
                class="ui basic button"
                data-inverted=""
                data-tooltip="Edit article"
                data-position="left center"
                @click="$emit('edit-article')"
              >
                <i class="edit icon"></i>
              </button>
              <button
                class="ui basic button"
                data-inverted=""
                data-tooltip="Delete article"
                data-position="right center"
                @click="$emit('delete-article', article._id)"
              >
                <i class="trash icon"></i>
              </button>
            </div>
          </template>
    </div>
    `
})