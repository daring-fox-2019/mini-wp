Vue.component('chips', {
    props : ['currentTags'],
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
    <div>
    <div v-for="(tag, index) in currentTags.tags" :key="index" >
    <a v-on:click="deltag(tag.description)" class="badge badge-light">{{tag.description}}</a>
    </div>
    </div>`
})


