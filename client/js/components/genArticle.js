Vue.component('dd-gen-article', {
  props: ['article'],
  
  data() {
    return {
      
    };
  },
  
  template: `
  <div>
    <v-card class="mb-3">
      <v-img
        v-if="article.imageURL"
        :src="article.imageURL"
        aspect-ratio="2.75"
      ></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ article.title }}</h3>
          <span class="grey--text">{{ article.creator }} | {{ (new Date(article.updated)).toString() }}</span>
          <p><span v-html="article.text"></span></p>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>
  </div>
  `
})