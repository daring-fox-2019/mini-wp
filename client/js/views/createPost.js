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
        getFormData(object) {
            console.log(object);
            const formData = new FormData();
            Object.keys(object).forEach(key => { 
                if(key === 'featured_image') {
                    formData.append('featured_image', object[key].data, object[key].name)
                }
                else formData.append(key, object[key])
            });
            return formData;
        },
        createPost(data) {
            this.formData = data
            uploadingImage = true;
            this.formData.created_at = new Date()
            const formData = this.getFormData(this.formData)

            const config = {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.miniwp_token
                }
            };
            
            this.$root.loading = true;

            axios.post(serverURL+'/articles', formData, config)
                .then(({data}) => {
                    console.log(`created successfully...${data}`);
                    this.$root.loading = false;
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