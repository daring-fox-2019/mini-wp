new Vue({
  el: '#app',
  data() {
    return {
      imageName: '',
      dialog: false,
      drawer: null,
      items: [
        {
          icon: 'home',
          text: 'Home',
          url: 'http://google.com'
        },
        {
          icon: 'person',
          text: 'Profile',
          url: ''
        },
        {
          icon: 'content_copy',
          text: 'Articles',
          url: ''
        },
        {
          icon: 'settings',
          text: 'Settings',
          url: ''
        },
        {
          icon: 'chat_bubble',
          text: 'Send feedback',
          url: ''
        },
        {
          icon: 'help',
          text: 'Help',
          url: ''
        },
        {
          icon: 'power_settings_new',
          text: 'Log out',
          url: ''
        },
        // {
        //   icon: 'keyboard_arrow_up',
        //   'icon-alt': 'keyboard_arrow_down',
        //   text: 'Labels',
        //   model: true,
        //   children: [
        //     { icon: 'add', text: 'Create label' }
        //   ]
        // },
      ],
      imageName: '',
      imageUrl: '',
      imageFile: '',
      title: "Image Upload",
      content: '',
      model: 1,
    }
  },
  methods: {
    test(input) {
      console.log({ input })
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
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  },
  props: {
    source: String
  },
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
})
