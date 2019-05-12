Vue.component('Editor', {
    props: ['article'],
    // data(){
    //     return {
    //         article:{}
    //     }
    // },
    components: {
        vuewysiwyg: vueWysiwyg.default.component,
    },
    methods: {
        patch(e) {
            this.$emit('patch', this.article)
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            let image = new Image();
            let reader = new FileReader();
            let vm = this;

            reader.onload = (e) => {
                vm.article.featured_image = e.target.result;
            };
            console.log(reader.readAsDataURL(file))
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.article.featured_image = '';
        }
    },
    template: `
    <div class="col p-2" >
        <div class="container">
            <form @submit.prevent="patch">
                <div class="form-group">
                    <label>title:</label>
                    <input type="text" class="form-control" v-model="article.title">
                </div>
                <div class="form-group">
                    <div v-if="!article.featured_image">
                        <h2>Select an image</h2>
                        <input type="file" @change="onFileChange">
                    </div>
                    <div v-else>
                        <input class="p-2" type="file" @change="onFileChange">
                        <button class="p-2" @click="removeImage">Remove image</button>
                        <img :src="article.featured_image" />
                        
                    </div>
                </div>          
                <div class="form-group">
                    <label for="post-content">
                        <p>content:</p>
                    </label>
                    <vuewysiwyg v-model="article.content"></vuewysiwyg>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
`
})