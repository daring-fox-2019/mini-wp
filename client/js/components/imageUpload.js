Vue.component('image-upload',{
    props: ['toupload'],
    data() {
        return {
            image: ''
        }
    },
    methods: {
        onDrop: function(e) {
          e.stopPropagation();
          e.preventDefault();
          var files = e.dataTransfer.files;
          this.createFile(files[0]);
        },
        onChange(e) {
          var files = e.target.files;
          this.createFile(files[0]);
        },
        createFile(file) {
          if (!file.type.match('image.*')) {
            console.log('Select an image');
            return;
          }
          var img = new Image();
          var reader = new FileReader();
          var vm = this;
  
          reader.onload = function(e) {
            vm.image = e.target.result;
            //emit event to parent to get the image
            vm.$emit('take-image', {data: file, name: file.name})
          }

          reader.readAsDataURL(file);

        },
        removeFile() {
          this.image = '';
          vm.$emit('take-image', {data: null, name: ''})
        }
    },
    template: `
    <div>
        <div class="helper"></div><!--
            --><div class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
            <div class="helper"></div><!--
            --><label v-if="!image" class="btn btn-danger display-inline">
                    SELECT OR DROP AN IMAGE
                    <input type="file" name="image" @change="onChange">
                </label><!--
            --><div class="hidden display-inline align-center" v-else v-bind:class="{ 'image': true }">
                <img :src="image" alt="" class="img" />
                <br>
                <br>
                <button class="btn btn-danger" @click="removeFile">REMOVE</button>
            </div>
        </div> 
    </div>
    `
})