Vue.component('dd-my-article', {
  props: ['article'],

  data() {
    return {
      showCard: false
    };
  },

  methods: {
    editArticle() {
      this.$emit('edit-article', this.article._id);
    },

    deleteArticle() {

    }
  },
  
  template: `
  <div>
    <v-card class="mb-3">
      <v-img
        v-if="article.imageURL"
        :src="article.imageURL"
      >
      </v-img>

      <v-card-title primary-title>
        <div>
          <div class="headline">{{ article.title }}</div>
          <span class="grey--text">{{ (new Date(article.updated)).toString() }}</span>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn @click="editArticle" flat color="blue"><v-icon>edit</v-icon>Edit</v-btn>
        <v-btn @click="deleteArticle" flat color="red"><v-icon>delete</v-icon>Delete</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="showCard = !showCard">
          <v-icon>{{ showCard ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="showCard">
          <span class="grey--text">{{ article.creator.name }}</span>
          <p>
            <span v-html="article.text"></span>
          </p>
        </v-card-text>
      </v-slide-y-transition>
      </v-card>
  </div>
  `
})