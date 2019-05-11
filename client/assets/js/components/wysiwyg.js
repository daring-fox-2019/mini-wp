Vue.component('sidebar', {
    methods: {
      toListPage() {
        this.$emit('go-to-list-page')
      },
      toArticlePage() {
        this.$emit('go-to-article-page')
      }
    },
    template: 
    `
    <div>
      <nav class="sidebar--container bg-light border-right">
          <div class="sidebar__heading">Parampampam</div>
          <ul class="list-group list-group-flush">
            <li 
              class="list-group-item 
                list-group-item-action 
                bg-light
                cursor-pointer"
                @click="toListPage"
            >List</li>
            <li 
              class="list-group-item 
                list-group-item-action 
                bg-light
                cursor-pointer"
              @click="toArticlePage"
            >Create Article</li>
          </ul>
      </nav>
    </div>
    `
})