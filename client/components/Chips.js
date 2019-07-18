Vue.component('chips', {
    props : ['namanya', 'currentPage'],
    data() {
        return {
            wanttodel : ''
        }
    },
    methods: {
      deltag(desc) {
          this.$emit('deletetag', desc)
      }
        
    },

    template :` 
    <a class="badge badge-light">{{namanya}}<slot></slot></a>
    `
})


{/* <i v-if="currentPage == 'myStory'" v-on:click="deltag(namanya)" class="ml-2 fas fa-times"></i> */}