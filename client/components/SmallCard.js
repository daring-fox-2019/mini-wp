Vue.component('smallcard', {
    props : ['art'],
    methods: {
      truncate(tulisan) {
        if (tulisan.length > 150) {
          return tulisan.substring(0,150).concat('...')
        } else {
          return tulisan
        }
      },
      getFullArticle(id) {
        console.log('ada kesini');
        this.$emit('fullarticle', id)
      },
      likeThis(id) {      
        this.$emit('likearticle', id)
      }  
      
    },
    template : `
    <div v-if="art">
     <div  class="card" style="border: none; min-height:150px; max-width: 340px; max-height:150px">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img :src="art.image" class="mt-3 align-middle card-img" alt="hehe">
          </div>
          <div style="line-height: 5pt !important; display:inline;" class="col-md-8">
            <div class="card-body">
              <h6 v-on:click="getFullArticle(art._id)" style="font-weight:100; font-family: 'Abril Fatface', cursive; letter-spacing: 0.02em;" class="card-title">{{art.title}} </h6>
              <p style="font-family: 'Habibi', serif;" class="text-muted">{{art.userId.name}} </p>
              <p style="font-family: 'Habibi', serif;" class="card-text">
              <div class="dropdown-divider"></div>
              <slot></slot>
              <small style="font-size:12px;" class="py-0 text-muted align-text-bottom">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
 `
})