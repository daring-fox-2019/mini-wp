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
      ></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ article.title }}</h3>
          <span class="grey--text">{{ article.creator.name }} | {{ (new Date(article.updated)).toString() }}</span>
          <p><span v-html="article.text"></span></p>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-layout row wrap justify-center>
          <dd-tag @search="$emit('search', tag.title)" v-for="(tag, i) in article.tags" :key="i" :tag="tag.title"></dd-tag>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
  `
})