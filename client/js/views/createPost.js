Vue.component('create-post', {
    data() {
        return {
            formData: null,
            status: {
                type: null,
                message: '',
            },
        }
    },
    methods: {
        getAlertClass() {
            if(this.status.type === 'error') {
                return 'alert alert-dismissible fade alert-danger show'
            }
            else {
                return 'alert alert-dismissible fade alert-success show'
            }
        },
        createPost(data) {
            this.formData = data
            console.log(this.formData);

            uploadingImage = true;
            this.newArticle.created_at = new Date

            const formData = getFormData(this.newArticle)
            
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.miniwp_token
                }
            };

            axios.post(serverURL+'/articles', formData, config)
                .then(({data}) => {
                    console.log(`created successfully...${data}`);
                    /* 
                    this.addArticle()
                    this.resetNewArticle() */

                    this.$root.page = 'index'
                })
                .catch(err => {
                    this.status.message = err.response
                })

        }
    },
    template:
    `<div class="d-flex flex-column pb-5">
        <h3 class="mb-4">Create New Post</h3>
        <div v-if="status.message" v-bind:class="getAlertClass()" role="alert">
            {{ status.message }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <postform type="create" v-on:create="createPost"></postform>
    </div>`
})