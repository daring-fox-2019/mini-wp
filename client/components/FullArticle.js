Vue.component('fullarticle', {
    props : ['currentArticle'],
    methods: {
      
    },
    template : `
    <div class="container-fluid">
    <center>
    <div class = "row">
    <div class="card mb-3 col-12">
    <div style="border: none;" class="card-body card ">
    <h2 style="font-family: 'Abril Fatface', cursive; letter-spacing: 0.02em;"  class="text-center card-title">{{currentArticle.title}}</h2>
    <p style="font-family: 'Lato', sans-serif;"  class="text-center card-text">You are currently reading an article from {{currentArticle.userId.username}}</p>
    <div id="keterangan" class="">
        <div class="row no-gutters">
            <div style="display:flex" class=" offset-md-2 justify-content-end col-12 col-sm-6 col-md-4">
                <img :src="currentArticle.userId.image"  style="border-radius:50%; max-height:50px; max-width:50px;" class="card-img-top" alt="fotouser">
            </div>
            <div style="display:flex" class="justify-content-start ml-2 col-6 col-md-4">
                <p style="font-family: 'Lato', sans-serif;"  class="mt-2 text-muted">{{currentArticle.userId.username}}</p>
                <small style="font-family: 'Lato', sans-serif;"  class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>     
    </div>
  </div>
    </div>
    </div>
    <div class="row">

        <div style="border-style:none" class="card col-1"></div>

    <div style="border-style:none" class="card col-10">
        <div class="card-body">
             <img :src="currentArticle.image" style="max-width:85vw; max-height:85vh;"  alt="topimg">
            <br>
            <br>
            <p class="text-left card-text">{{currentArticle.content}}
            </p>
        </div>
        </div>
        <div style="border-style:none" class="card col-1"></div>


    </div></center>
    </div>
    `
})

