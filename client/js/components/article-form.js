Vue.component('article-form', {
    props: [ 'article', 'oldArticle' ],
    data() {
        return {
            newTitle: '',
            newSubtitle: '',
            newContent: '',
            newImage: '',
            newTag: '',
            newTags: [],
            edit: false
        }
    },
    created() {
        if (this.oldArticle !== '') {
            this.newTitle = this.oldArticle.title
            this.newSubtitle = this.oldArticle.subtitle
            this.newContent = this.oldArticle.content
            this.newTags = this.oldArticle.tags

            this.edit = true
        }
    },
    methods: {
        addTag() {
            if (this.newTags.indexOf(this.newTag) < 0 && this.newTag !== ' ') {
                this.newTags.push(this.newTag)
            }
            this.newTag = ''
        },
        removeTag(v) {
            this.newTag = this.newTag.replace(/ /g, '')
            this.newTags = this.newTags.filter(tag => tag !== v)
        },
        previewFile(event) {
            this.newImage = event.target.files[0]
        },
        addArticle() {
            let method = 'post';
            let id = '';
            let edit = false;

            if (this.oldArticle !== '') {
                method = 'patch';
                id = `/${this.article._id}`
                edit = true;
            }
            const newArticle = new FormData();

            newArticle.append('title', this.newTitle);
            newArticle.append('subtitle', this.newSubtitle);
            newArticle.append('content', this.newContent)
            newArticle.append('tags', this.newTags);
            newArticle.append('image', this.newImage);

            axios({
                url: baseUrl + '/articles' + id,
                method: method,
                headers: {
                    accesstoken: localStorage.getItem('accesstoken'),
                    'Content-Type': 'multipart/form-data'
                },
                data: newArticle
            })
                .then(({ data }) => {
                    if (!edit) {
                        this.$parent.articles.unshift(data)
                    }
                    this.$parent.oldArticle = ''
                    this.$parent.showHomePage();
                })
                .catch(err => {
                    if (err.response) {
                        swal(err.response.data.message)
                    } else {
                        console.log(err)
                    }
                })

        },
    },
    template: `
    <div class="ui container" style="margin-top: 7rem;">
        <div class="ui piled segment">
            <form class="ui large form">
              <h1 class="ui header">{{ edit ? 'Edit Article' : 'Add New Article' }}</h1>
              <div class="ui form">
                <div class="field">
                  <label for="title">Title</label>
                  <input type="text" placeholder="Title" v-model="newTitle" />
                </div>
                <div class="field">
                  <label for="subtitle">Subtitle</label>
                  <input
                    type="text"
                    placeholder="Subtitle"
                    v-model="newSubtitle"
                  />
                </div>
                <div class="field">
                  <label for="">Featured Image</label>
                  <input type="file" @change="previewFile" />
                </div>
                <div class="field">
                  <label for="content">Content</label>
                  <wysiwyg v-model="newContent"></wysiwyg>
                </div>
                <div class="ui labels">
                  <div class="ui label" v-for="(tag, i) in newTags" :key="i">
                    {{ tag }}
                    <i class="close icon" @click="removeTag(tag)"></i>
                  </div>
                </div>
                <div class="field"
                    data-inverted=""
                    data-tooltip="Type spacebar to add new tag"
                    data-position="left center"
                >
                  <label for="tags">Tag</label>
                  <input
                    type="text"
                    v-model="newTag"
                    @keyup.enter.space="addTag"
                  />
                </div>
                <div class="ui right black button" @click="addArticle">
                  <p>Submit</p>
                </div>
              </div>
            </form>
        </div>
    </div>
    `,
    components: {
        wysiwyg: vueWysiwyg.default.component,
    }
})