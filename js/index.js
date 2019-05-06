new Vue({
  el: '#app',
  props: {
    source: String
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data: () => ({
    drawer: true,
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Title is required'
    ],
    content: '',
    contentRules: [
      v => !!v || 'Content is required'
    ],
    select: null,
    checkbox: false,
    dialog: false,
    imageUrl: '',
    imageFile: '',
    displayContent: '',
    show: false,
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.imageUrl = ''
      this.content = ''
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    displayAddArticle() {
      this.displayContent = 1
    },
    displayDraftArticle() {
      this.displayContent = 2
    },
    displayPublishArticle() {
      this.displayContent = 3
    }
  }
})