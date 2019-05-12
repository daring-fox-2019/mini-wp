Vue.component('dd-my-article', {
  props: ['article'],

  data() {
    return {
      showCard: false
    };
  },

  methods: {
    editArticle() {
      
    },

    deleteArticle() {

    }
  },
  
  template: `
  <div>
    <v-card class="mb-3">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      >
      </v-img>

      <v-card-title primary-title>
        <div>
          <div class="headline">{{ article.title }}</div>
          <span class="grey--text">{{ article.updated }}</span>
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
          <span class="grey--text">{{ article.creator }}</span>
          <p>
            <span v-html="article.text"></span>
          </p>
        </v-card-text>
      </v-slide-y-transition>
      </v-card>
  </div>
  `
})