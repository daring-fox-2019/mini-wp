Vue.component('sidebar', {
    methods: {
      toListPage() {
        this.$emit('go-to-list-page')
      },
      toHomePage() {
        this.$emit('go-to-home-page')
      }
    },
    template: 
    `
    <div>
      <nav class="sidebar--container bg-white border-right">
          <div class="sidebar__heading">Menu</div>
          <ul class="list-group list-group-flush bg-white">
            <li 
              class="list-group-item 
                list-group-item-action 
                cursor-pointer"
                @click="toHomePage"
            >Home</li>
            <li 
              class="list-group-item 
                list-group-item-action 
                cursor-pointer"
                @click="toListPage"
            >Article</li>
            <li 
              class="list-group-item 
                list-group-item-action 
                cursor-pointer"
            >About</li>
          </ul>
      </nav>
    </div>
    `
})