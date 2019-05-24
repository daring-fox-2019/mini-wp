Vue.component('tags', {
  props: ['tags'],
  methods: {
    searchTags(tag) {
      this.$emit('search-tag', tag)
    }
  },
  template: `
  <div>
    <span class="grey--text">Tags : </span>
    <v-chip small v-for="(tag, index) in tags" :key="index" 
    @click="searchTags(tag)" v-tooltip.bottom-end="'Click for search'">
    {{ tag }}</v-chip>
  </div>
  `
})
