<template>
  <v-dialog max-width="800px">
    <v-btn flat slot="activator" class="success">
      <v-icon>add</v-icon>New Article
    </v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Article</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Title" v-model="title" prepend-icon="folder"></v-text-field>
          <v-progress-circular indeterminate color="accent" v-if="showLoading"></v-progress-circular>
          <img :src="imageUrl" height="150" v-if="imageUrl">
          <v-text-field
            :disabled="coverImg !== ''"
            label="Cover Image"
            @click="pickFile"
            v-model="imageName"
            prepend-icon="attach_file"
          ></v-text-field>
          <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          >
          <v-btn flat class="mx-0 mt-3" @click="uploadCoverImg" v-if="imageUrl">
            <v-icon small>send</v-icon>upload
          </v-btn>
          <vue-editor
            id="editor"
            useCustomImageHandler
            @imageAdded="handleImageAdded"
            v-model="editorData"
          ></vue-editor>
          <v-btn flat class="success mx-0 mt-3" @click="submit">
            <v-icon small>send</v-icon>Submit
          </v-btn>
          <v-switch
            v-model="publish"
            :label="`publish: ${publish.toString()}`"
            color="red"
            true-value="published"
            false-value="unpublished"
            hide-details
          ></v-switch>
        </v-form>
      </v-card-text>
    </v-card>
    <Alert></Alert>
  </v-dialog>
</template>
<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { VueEditor } from "vue2-editor";
import Alert from "@/components/Alert";
import Axios from "axios";
import Swal from "sweetalert2";

export default {
  components: {
    VueEditor,
    Alert
  },
  data() {
    return {
      title: "",
      content: "test",
      editor: ClassicEditor,
      publish: "unpublished",
      editorData: "<p>content of the editor</p>",
      imageUrl: "",
      dialog: false,
      imageName: "",
      imageFile: "",
      coverImg: "",
      showLoading: false,
      showAlert: false
    };
  },
  methods: {
    uploadCoverImg() {
      this.showLoading = true;
      this.imageUrl = "";
      let formData = new FormData();
      formData.append("image", this.imageFile);
      Axios({
        url: "http://localhost:3000/upload",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.link;
          this.showLoading = false;
          this.coverImg = url;
          this.imageName += " uploaded";
          this.imageUrl = "";
        })
        .catch(error => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: error
          });
        });
    },
    submit() {
      Axios({
        url: "http://localhost:3000/articles",
        method: "POST",
        data: {
          title: this.title,
          content: this.editorData,
          image: this.coverImg,
          status: this.publish
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          this.editorData = "";
          this.title = "";
          this.coverImg = "";
          this.$emit("updated");
          Swal.fire({
            position: "top-end",
            type: "success",
            title: "Your article has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: error
          });
        });
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("image", file);
      Axios({
        url: "http://localhost:3000/upload",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.link;
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
          this.$emit("updated");
        })
        .catch(error => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: error
          });
        });
    }
  }
};
</script>
