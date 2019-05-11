Vue.component('headlinecard', {
  props : ['art'],
  methods: {
    getFullArticle(id) {
      console.log('ada kesini');
      this.$emit('fullarticle', id)
    },
      
  },
  template : `
  <div style="border: none;" class="card mb-3">
    <img :src="art.image"  class="card-img-top" alt="headline_photo">
    <div class="card-body">
      <h5 @click="getFullArticle(art._id)" style="font-family: 'Abril Fatface', cursive; letter-spacing: 0.02em;"  class="text-left card-title">{{art.title}}</h5>
      <p style="font-family: 'Lato', sans-serif;"  class="text-left card-text">{{art.content}}</p>
      <div id="keterangan" class="">
            <div style="display:flex">
            <img :src="art.userId.image" style="border-radius:50%; max-height:50px; max-width:50px;"  class="card-img-top" alt="foto user">
            <p style="font-family: 'Lato', sans-serif;"  class="ml-3 mt-2 text-muted">{{art.userId.username}}</p>
            </div>
      </div>
      <p class="card-text text-left"><small style="font-family: 'Lato', sans-serif;"  class="text-muted">{{art.updatedAt}}</small></p>
    </div>
  </div>`
})

