Vue.component('article-card', {
    props: ['article'],
    template: `
    <div>
    <div v-show="article.showStatus = true" class="card" style="background-color:antiquewhite">
        <img class="img-thumbnail" :src=article.image alt="">
        <div class="card-body d-flex justify-content-between" style="background-color:antiquewhite">
        </div>
        <div class="row justify-content-around">
            <i class="fas fa-user"><p>{{article.author}}</p></i>
            <i class="fas fa-calendar-alt"><p>{{article.created_at.substring(0,10)}}</p></i>                                    
        </div>
        <div class="row justify-content-around p-3">
            <p class="col"><b>{{article.title}}</b></p>
        </div>
    </div>
    </div>
  `
  })
  