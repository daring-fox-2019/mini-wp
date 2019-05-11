Vue.component('update-post', {
    props: ['initdata'],
    data() {
        return {
            formData: null,
            status: {
                type: '',
                message: '',
            }
        }
    },
    mounted() {
        this.formData = this.$props.initdata;
    },
    methods: {
        getAlertClass() {
            if(status.type === 'error') {
                return 'alert alert-dismissible fade alert-danger'
            }
            else {
                return 'alert alert-dismissible fade alert-success'
            }
        },
        updatePost(data) {
            console.log(data, '---- toupdate');
            axios({
                method: 'PUT',
                url: serverURL + '/articles/' + data._id,
                data: data,
                headers: {
                    'Authorization': localStorage.getItem('miniwp_token')
                }
            })
            .then(({data}) => {
                console.log('post updated');
            })
            .catch(err => {

            })
        },
        showUpdatePost(id) {
            axios.get(serverURL + '/articles/' + id, this.config)
            .then(({data}) => {
              console.log('main: updated post...')
              this.currentPost = data
              this.page = 'updatePost'
              
            })
            .catch(({response}) => {
              console.log(response);
              Swal.fire(
                'Error!',
                response.data.error.message,
                'error'
              )
            })
            this.page = 'updatePost'
        },
    },
    template:
    `<div class="d-flex flex-column pb-5">
        <h3 class="mb-4">Update Post</h3>
        <div v-if="status.message" v-bind:class="getAlertClass()" role="alert">
            {{ status.message }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <postform type="update" v-on:update="updatePost" :data="initdata"></postform>
    </div>`
})