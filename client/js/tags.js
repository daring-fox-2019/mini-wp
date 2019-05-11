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
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
          </template>
          <span>Im A ToolTip</span>
        </v-tooltip>
        <template #activator="{ on: menu }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            
          </template>
          <span>Im A ToolTip</span>
        </v-tooltip>
      </template>
    </div>
    `
    // template: `
    // <div>
    //     <span class="grey--text">Tags : </span>
        
    //         <v-chip small v-for="(tag, index) in tags" :key="index" @click="searchTags(tag)">{{ tag }}</v-chip>
            
    // </div>
    // `
})
