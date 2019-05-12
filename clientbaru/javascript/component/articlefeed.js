
Vue.component('articlefeed',{
  props : ['articles', "author"],
  data (){
    return {

    }
  },
  methods : {
    readarticle(article){
      console.log(article)
    }
  },
  template : `
  <div class="ui container">
    <div class="ui segment" v-for="a in articles">
      <div class="ui items">
        <div class="item">
          <div class="ui small image" v-if="a.image !== ''">
            <img v-bind:src="a.image">
          </div>
          <div class="content">
            <a class="header" @click="readarticle(a)">{{a.title}}</a>
            <div class="meta">
              <pre><i class="calendar alternate outline   icon"></i> {{a.createdAt}}  <i class="tag   icon"></i> {{a.status}}</pre> 
            </div>
            <div class="description">
              {{a.snippet}}
            </div>
            <div class="extra">
              <i class="ui users icon"></i>  {{author}}   <br>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  `
})