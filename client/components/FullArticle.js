Vue.component('fullarticle', {
    props : ['currentArticle'],
    data() {
        return {
            languange : ''
        }
    },
    methods: {
      selectTranslate(event) {
        // alert(event.target.value)
        this.$emit('translate', event.target.value)
      }
    },
    template : `
    <div class="container-fluid">
    <center>
    <div class = "row">
    <div class="card mb-3 col-12">
    <div style="border: none;" class="card-body card ">
    <div class="row">
    <div class ="justify-content-end col-sm-3 offset-md-9">
        <div class="input-group">
            <select @change="selectTranslate" class="custom-select" aria-label="Example select with button addon">
                <option selected>Translate</option>
                <option value="or">Original</option>
                <option value="en">English</option>
                <option value="id">Indonesian</option>
                <option value="de">Deutsch</option>
                <option value="zh-CN">中文</option>     
            </select>
        </div>
    </div>
    </div>
    <h2  style="font-family: 'Abril Fatface', cursive; letter-spacing: 0.02em;"  class="text-center card-title">{{currentArticle.title}}</h2>
    <p style="font-family: 'Lato', sans-serif;"  class="text-center card-text">You are currently reading an article from {{currentArticle.userId.username}}</p>
    <div id="keterangan" class="">
        <div class="row no-gutters">
            <div style="display:flex" class=" offset-md-2 justify-content-end col-12 col-sm-6 col-md-4">
                <img :src="currentArticle.userId.image"  style="border-radius:50%; max-height:50px; max-width:50px;" class="card-img-top" alt="fotouser">
            </div>
            <div style="display:flex" class="justify-content-start ml-2 col-6 col-md-4">
                <p style="font-family: 'Lato', sans-serif;"  class="mt-2 text-muted">{{currentArticle.userId.username}}</p>
            </div>
        </div>     
    </div>
        <small style="font-family: 'Lato', sans-serif;"  class="text-muted">{{currentArticle.updatedAt}}</small>
            
        <small class="mt-2">Article Featured on : </small> 
            <div class="row justify-content-center">
                <div class="mx-1" v-for="(tag, index) in currentArticle.tags" :key="index">
                    <chips v-bind:namanya="tag.tagName"></chips>
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
            <p class="text-left card-text" v-html="currentArticle.content">
            </p>
        </div>
        </div>
        <div style="border-style:none" class="card col-1"></div>


    </div></center>
    </div>
    `
})

