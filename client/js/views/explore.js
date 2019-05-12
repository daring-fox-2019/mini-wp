Vue.component('explore', {
    data() {
        return {
            tags: [],
            mainPost: [],
            postsByTag: [],
            randomTag: '',
        }
    },
    methods: {
        getTags() {
            axios.get(serverURL + '/tags')
                .then(({data}) => {
                    this.tags = data
                    this.randomTag = this.tags[Math.floor(Math.random() * this.tags.length)]
                    console.log('get tags....');

                    this.getPostsByTag()
                })
                .catch(({response}) => {
                    Swal.fire(
                        'Error!',
                        response.data,
                        'error'
                      )
                })
        },
        getMainPost() {
            axios.get(serverURL + '/articles/random')
                .then(({data}) => {
                    this.mainPost = data
                })
                .catch(({response}) => {
                    Swal.fire(
                        'Error!',
                        response.data.error.message,
                        'error'
                      )
                })
        },
        getPostsByTag() {
            console.log('=======', this);

            axios.get(serverURL + `/tag/${this.randomTag.text}`)
                .then(({data}) => {
                    this.postsByTag = data
                })
                .catch(({response}) => {
                    Swal.fire(
                        'Error!',
                        response.data,
                        'error'
                      )
                })
        },
    },
    mounted () {
        this.getTags()
    },
    template: 
    `<div class="container-fluid">
        <div class="row">
            <div class="d-flex flex-column explore__headline">
            </div>
        </div>
        <div class="row">
            <div class="d-flex flex-column">
                <h3 class="mb-2">Explore Today:  {{randomTag.text}}</h3>
                <postlist :posts="postsByTag"></postlist>
            </div>
        </div>
    </div>
    `
})