Vue.component('read-content', {
    props : ['status', 'dataArticle'],
    data(){
        return {
            languages : [
                { lang : 'Bahasa', code: 'id'},
                { lang : 'English', code: 'en'},
                { lang : 'French',code:	'fr'},
                { lang : 'German',code: 'de'},
                { lang : 'Italian',code: 'it'},
                { lang : 'Russian',code: 'ru'},
                { lang : 'Spanish', code: 'es'}
            ],
            date : moment( this.dataArticle.createdAt).format("MMM Do YY")
        }
    },
    methods : {
        setLanguage(target){
            axios.post(`${url}/articles/translate`, { text: `${this.dataArticle.title}~~~!${this.dataArticle.text}`, target}, {headers : {token : localStorage.getItem('token')}})
            .then( ({data}) => {
                data = data.translations[0].translatedText.split('~~~!')
                this.dataArticle.text = data[1]
                this.dataArticle.title = data[0]
            })
            .catch( err => {
                Swal.fire({
                    title: 'Error',
                    text: `${err.respnse.data.message}`,
                    type: 'error',
                    showConfirmButton: false
                })
            })
        }
    },
    template : 
    `
    <div class="container mt-5"  style="padding-top:140px;padding-bottom:100px">
        <div class="container">
            <div class="row">
                <div class="col-9"> 
                    <div style="overflow-wrap: break-word;
                    word-wrap: break-word;
                    hyphens: auto;">
                        <h2> {{dataArticle.title}}</h2>
                    </div>
                    <h6 style="color:#49beb7"> {{date}} </h6>
                    <h6 style="color:grey"> by : <i>{{dataArticle.author.name}}</i> </h6>
                </div>
                <div class="col-3"> 
                    <b-dropdown id="dropdown-1" text="Select Language" class="m-md-2">
                        <b-dropdown-item v-for="(lang, i) in languages" :key="i" @click=setLanguage(lang.code)> {{lang.lang}} </b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </div>
        <hr>
        <div class="container">
            <p v-html="dataArticle.text"></p>
        </div>
        <div class="py-2"> 
            <button v-for="tag in dataArticle.tags" class="btn btn-sm btn-outline-secondary m-1"> {{tag.text}}</button>
        </div>
    </div>
    `
})