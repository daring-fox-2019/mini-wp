Vue.component('FormArticle', {
  props: ['articleId', 'login'],
  data: function () {
    return {
      editor: ClassicEditor,
      title: '',
      body: '',
      coverImg: '',
      tags: [],
      isImageChange: false
    }
  },
  mounted: function () {
    if (this.articleId) {
      axios
        .get(`/articles/${this.articleId}`, {
          headers: {
            Authorization: this.login.token
          }
        })
        .then(({ data }) => {
          let { article } = data
          this.title = article.title
          this.body = article.body
          this.tags = article.tags
          this.coverImg = article.coverImg.originalName
          this.$refs['image-preview'].src = article.coverImg.path.replace('https', 'http')
        })
    }
  },
  methods: {
    handleChangeInputTag: function (tagString) {
      let names = tagString.split(',').map(name => name.trim()).filter(name => !!name)
      this.tags = names.map(name => ({ name }))
    },
    handleClickDeleteTag: function (deleteTag) {
      this.tags = this.tags.filter(tag => tag.name !== deleteTag)
    },
    handleSubmitArticle: function () {
      let isEdit = !!this.articleId
      let payload = {
        title: this.title,
        body: this.body,
        tags: JSON.stringify([...this.tags])
      }

      let formData = new FormData()
      for (let key in payload) {
        formData.append(key, payload[key])
      }

      if (this.isImageChange) {
        formData.append('coverImg', this.$refs.coverImg.files[0])
      }

      axios({
        method: isEdit ? 'PUT' : 'POST',
        url: isEdit ? `/articles/${this.articleId}` : '/articles',
        data: formData,
        headers: {
          Authorization: this.login.token
        }
      })
        .then(({ data }) => {
          this.title = ''
          this.body = ''
          this.coverImg = ''
          this.tags = []
          if (isEdit) this.$emit('updated-article', data.article)
          else this.$emit('created-article', data.article)
        })
        .catch(err => console.log(err))
    },
    handleChangeImage: function () {
      this.isImageChange = true
      let files = this.$refs.coverImg.files
      if (files && files[0]) {
        this.coverImg = files[0].name

        const reader = new FileReader()
        reader.onload = e => {
          this.$refs['image-preview'].src = reader.result
        }
        reader.readAsDataURL(files[0])
      }
    }
  },
  template: `
    <div class="container pt-5">
      <div class="row justify-content-center">
        <div class="col-lg-10 px-3">
          <div class="card p-3 shadow">
            <div class="card-body">
              <h5 class="card-title">Create Article</h5>
              <hr />
              <form @submit.prevent="handleSubmitArticle">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input class="form-control" type="text" name="title" v-model="title" required autofocus/>
                </div>
                <div class="form-group">
                  <label for="cover-img">Cover image</label>
                  <figure
                    class="bg-secondary rounded overflow-hidden"
                    style="height: 280px;"
                  >
                    <img
                      ref="image-preview"
                      class="img-fluid border shadow-lg"
                      style="width: 100%;"
                      v-show="coverImg"
                    />
                  </figure>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      ref="coverImg"
                      @change="handleChangeImage"
                      :required="!articleId || !coverImg"
                    />
                    <label class="custom-file-label">{{ coverImg }}</label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="body">Body</label>
                  <ckeditor :editor="editor" v-model="body"></ckeditor>
                </div>
                <div class="form-group">
                  <label for="tags">Tags</label>
                  <input-tag :tags="tags" @change="handleChangeInputTag" @delete="handleClickDeleteTag"></input-tag>
                </div>
                <button class="btn btn-block btn-success mt-4">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
