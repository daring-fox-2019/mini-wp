Vue.component('dd-article-form', {
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  
  data() {
    return {
      article: {
        head: 'Create an article',
        title: '',
        text: '',
        image: null,
        tags: []
      },
    };
  },

  methods:{
    resetForm() {
      this.article.title = '';
      this.article.text = '';
      this.article.image = null;
      this.tags = [];
    },

    openFileDialog() {
      document.getElementById('file-upload').click();
    },

    onFileChange(e) {
      // var self = this;
      // var files = e.target.files || e.dataTransfer.files;
      // if(files.length > 0){
      //     for(var i = 0; i< files.length; i++){
      //         self.formData.append("file", files[i], files[i].name);
      //     }
      // }
      this.article.image = e.target.files[0];
    },

    uploadFile() {
      // var self = this; 
      // axios.post('URL', self.formData).then(function (response) {
      //     console.log(response);
      // }).catch(function (error) {
      //     console.log(error);
      // });
      const { title, text, image } = this.article;
      let formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        formData.append('image', image);
        this.resetForm();
        this.$emit('upload', formData);
    },
  },

  template: `
  <div>
    <span class="display-1">{{ article.head }}</span>
    <v-form @submit.prevent="uploadFile" class="mb-3">
      <v-layout row class="mt-3">
        <v-text-field
          v-model="article.title"
          label="Title"
          outline
        ></v-text-field>
      </v-layout>
      <v-layout row>
        <wysiwyg v-model="article.text" />
      </v-layout>
      <v-btn color="grey" class="black--text" @click.native="openFileDialog">
        Upload
        <v-icon right dark> cloud_upload</v-icon>
      </v-btn>
      {{ article.image ? article.image.name : '' }}
      <input type="file" id="file-upload" style="display:none" @change="onFileChange">
      <v-layout row class="mt-4">
        <v-text-field
          v-model="article.tags"
          label="Tags"
          outline
        ></v-text-field>
      </v-layout>
      <v-layout justify-end row>
        <v-btn type="submit" flat color="green">Submit <v-icon>send</v-icon></v-btn>
      </v-layout>
    </v-form>
  </div>
  `
})