Vue.component('tags', {
  props: ['tags'],
  methods: {
    searchTags(tag) {
      this.$emit('search-tag', tag)
    }
  },
  // template: `
  //   <div>
  //       <span class="grey--text">Tags : </span>
  //       <v-menu>
  //       <template #activator="{ on: menu }">
  //         <v-tooltip bottom>
  //           <template #activator="{ on: tooltip }">
  //             <v-btn
  //               color="primary"
  //               dark
  //               v-on="{ ...tooltip, ...menu }"
  //             >Dropdown w/ Tooltip</v-btn>
  //           </template>
  //           <span>Im A ToolTip</span>
  //         </v-tooltip>
  //       </template>
  //       <v-list>
  //         <v-list-tile
  //           v-for="(item, index) in items"
  //           :key="index"
  //           @click=""
  //         >
  //           <v-list-tile-title>{{ item.title }}</v-list-tile-title>
  //         </v-list-tile>
  //       </v-list>
  //     </v-menu>
  //   </div>
  //   `
  template: `
  <div>
    <span class="grey--text">Tags : </span>
    <v-chip small v-for="(tag, index) in tags" :key="index" 
    @click="searchTags(tag)" v-tooltip.bottom-end="'Click for search'">
    {{ tag }}</v-chip>
  </div>
  `
})
