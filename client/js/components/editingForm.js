Vue.component('dd-editing-form', {
  props: ['editingArticle'],

  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  
  data() {
    return {
      article: {
        head: 'Edit article',
        title: '',
        text: '',
        image: null,
        tags: []
      },
      items: []
    };
  },

  mounted() {
    axios({
      method: 'get',
      url: `${serverURL}/tags`
    })
      .then(({ data }) => {
        this.items = data.tags;
        this.items = this.items.map(item => item.title);
      })
      .catch(err => {
        const { status } = err.response;
        const { message } = err.response.data;
        if (status === 404 ) {
          this.items = [];
        } else {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    const { title, text } = this.editingArticle;
    this.article.title = title;
    this.article.text = text;
  },

  methods:{
    resetForm() {
      this.article.title = '';
      this.article.text = '';
      this.article.image = null;
      this.article.tags = [];
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
      const { title, text, image, tags } = this.article;
      let formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        formData.append('image', image);
        formData.append('tags', tags);
        this.resetForm();
        this.$emit('edit', { id: this.editingArticle._id, data: formData });
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
        <v-combobox
          v-model="article.tags"
          :items="items"
          label="Enter your tags"
          chips
          clearable
          prepend-icon="tags"
          solo
          multiple
        >
          <template v-slot:selection="data">
            <v-chip
              :selected="data.selected"
              close
              @input="remove(data.item)"
            >
              <strong>{{ data.item }}</strong>&nbsp;
            </v-chip>
          </template>
        </v-combobox>
      </v-layout>
      <v-layout justify-end row>
        <v-btn type="submit" flat color="green">Save <v-icon>send</v-icon></v-btn>
      </v-layout>
    </v-form>
  </div>
  `
})