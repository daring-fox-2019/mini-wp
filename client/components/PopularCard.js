Vue.component('popularcard', {
    props : ['user.currentArticle'],
    methods: {
        getFullArticle(id) {
            this.$emit('fullarticle', id)
        }
        
    },
    template : `
    <div class="card" style="border:none; max-width:50vh;">
    <div class="row no-gutters">
      <div class="col-md-4">
      <h1 style="font-weight:400; font-family: 'Abril Fatface';"  class="mt-3 ml-4">01</h1>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 style="font-weight:400; font-family: 'Abril Fatface';" class="card-title">Card title</h5>
          <p style="font-family: 'Lato', sans-serif;" class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p style="font-family: 'Lato', sans-serif;"  class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>`
})