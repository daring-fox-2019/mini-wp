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
        getFormData(object) {
            const formData = new FormData();
            Object.keys(object).forEach(key => { 
                if(key === 'featured_image') {
                    formData.append('featured_image', object[key].data, object[key].name)
                }
                else formData.append(key, object[key])
            });
            return formData;
        },
        getAlertClass() {
            if(status.type === 'error') {
                return 'alert alert-dismissible fade alert-danger'
            }
            else {
                return 'alert alert-dismissible fade alert-success'
            }
        },
        updatePost(data) {
            const newData = this.getFormData(data)

            this.$root.loading = true;
            axios({
                method: 'PUT',
                url: serverURL + '/articles/' + data._id,
                data: newData,
                headers: {
                    'Authorization': localStorage.getItem('miniwp_token')
                }
            })
            .then(({data}) => {
                Swal.fire(
                    'Success',
                    'Update done',
                    'success'
                )
                this.$root.loading = false;
                this.$root.showIndex()
            })
            .catch(({response}) => {
                Swal.fire(
                    'Oops',
                    response.data,
                    'error'
                )
                this.$root.loading = false;
            })
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