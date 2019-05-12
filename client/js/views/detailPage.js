Vue.component('detail-page', {
    props: ['post'],
    data() {
        return {
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
    },
    template:
    `<div>
        <post-detail :post="post"></post-detail>
    </div>`
})