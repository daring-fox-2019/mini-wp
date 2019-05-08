new Vue ({
  el: '#app',
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data: {
    search: '',

    article: {
      head: 'Create an article',
      title: '',
      text: '',
      image: '',
      tags: ''
    },

    showCard: false,

    drawer: null,
    items: [
      { title: 'Home', icon: 'home' },
      { title: 'My Articles', icon: 'short_text' },
      { title: 'Edit Articles', icon: 'create' }
    ],
    clouds: [
      { title: 'Storage', icon: 'storage' },
      { title: 'Drive', icon: 'keyboard' }
    ],
    accounts: [
      { title: 'Settings', icon: 'settings' },
      { title: 'Privacy and Account', icon: 'security' }
    ]
  },
  watch: {
    article: {
      handler() {
        console.log(this.article.text);
      },
      deep: true
    }
  },
  methods: {
    openFileDialog() {
      document.getElementById('file-upload').click();
    },
    onFileChange(e) {
        var self = this;
        var files = e.target.files || e.dataTransfer.files;       
        if(files.length > 0){
            for(var i = 0; i< files.length; i++){
                self.formData.append("file", files[i], files[i].name);
            }
        }   
    },
    uploadFile() {
        var self = this; 
        axios.post('URL', self.formData).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    },
  }
});
