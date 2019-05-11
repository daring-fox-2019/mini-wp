Vue.component('image-upload',{
    props: ['toupload', 'initimage'],
    data() {
        return {
          image: '',
          edited: false,
        }
    },
    computed: {
      finalimage: {
        set: function(value) {
          this.image = ''
          console.log(this.image);
          this.edited = true;
        },
        get: function(){
          let result = ''
          result = this.edited ? this.image : this.$props.initimage

          console.log('res --- ',this.edited, result);
          return result
        },
      },
    },
    mounted() {
      console.log('....init', this.$props.initimage);
      this.image = this.$props.initimage
    },
    methods: {
        onDrop: function(e) {
          e.stopPropagation();
          e.preventDefault();
          var files = e.dataTransfer.files;
          this.createFile(files[0]);
        },
        onChange(e) {
          this.edited = true
          console.log('onchange...', files);
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
            console.log(this);
            console.log(vm.image);
            this.image = e.target.result
            // debugger

            console.log('onload image...',this.image);
            //emit event to parent to get the image
            vm.$emit('take-image', {data: file, name: file.name})
          }

          reader.readAsDataURL(file);

        },
        removeFile() {
          console.log('remove.....');
          this.finalimage = ''
        }
    },
    template: `
    <div>
        <div class="helper"></div><!--
            --><div class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
            <div class="helper"></div><!--
            --><label v-if="!finalimage" class="btn btn-danger display-inline">
                    SELECT OR DROP AN IMAGE
                    <input type="file" name="name" @change="onChange">
                </label><!--
            --><div class="hidden display-inline align-center" v-else v-bind:class="{ 'finalimage': true }">
                <img :src="finalimage" alt="" class="img" />
                <br>
                <br>
                <button class="btn btn-danger" @click.prevent="removeFile">REMOVE</button>
            </div>
        </div> 
    </div>
    `
})