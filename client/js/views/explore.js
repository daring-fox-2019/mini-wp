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
            axios.get(serverURL + '/explore/random')
                .then(({data}) => {
                    this.mainPost = data
                    console.log('main post...', this.mainPost);
                })
                .catch(({response}) => {
                    Swal.fire(
                        'Error!',
                        response.data,
                        'error'
                      )
                })
        },
        getPostsByTag() {
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
        processTag(tag) {
            this.$root.searchTag = tag
            this.$root.page = 'search'
        }
    },
    mounted () {
        this.getMainPost();
        this.getTags()
    },
    template: 
    `<div class="container-fluid" style="min-height: calc(100vh - 56px);">
        <div class="row mb-5 explore__headline" >
            <div class="col-lg-9 col-md-7 col-sm-12 flex-column">
                <small class="text-muted">{{$root.formattedDate(mainPost.created_at)}}</small>
                <div class="detail__title headline-title" @click="$root.showDetailPostSlug(mainPost.slug)">{{ mainPost.title }}</div>
                <div class="row headline-summary-img flex-nowrap">
                    <div class="d-flex align-items-center p-2 mr-5">
                        <img v-bind:src="mainPost.featured_image" class="card-img headline-img" v-bind:alt="mainPost.title">
                    </div>
                    <div class="d-flex flex-column align-items-start" style="overflow-x: hidden;    ">
                        <div class="headline-summary" v-html="mainPost.content"></div>
                        <div class="headline-seemore" @click="$root.showDetailPostSlug(mainPost.slug)">Selengkapnya</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-5 col-sm-12 d-flex flex-column explore__tags-main">
                <h4>Topics</h4>
                <div class="mt-3 d-flex flex-column explore__tag-list">
                    <div class="explore__tag-item" v-for="tag in tags" @click="processTag(tag.text)">{{ tag.text }}</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="d-flex flex-column" style="width: 100%;">
                <h3 class="mb-5">Explore: {{randomTag.text}}</h3>
                <div class="row px-2">
                    <div class="d-flex flex-column" style="width: 85%;">
                        <div class="card mb-3 explore__card-item-panel" style="width: 100%;" v-for="post in postsByTag" @click="$root.showDetailPostSlug(post.slug)">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img v-bind:src="post.featured_image" class="card-img explore__card-img" v-bind:alt="post.title">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body explore__card-item-body justify-content-between">
                                        <h5 class="card-title">{{post.title}}</h5>
                                        <div class="card-text explore__item-content" v-html="post.content"></div>
                                        <p class="card-text mt-3"><small class="text-muted">{{$root.formattedDate(post.created_at, 'MMM DD, YYYY')}}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})