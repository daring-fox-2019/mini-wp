Vue.component('mystories', {
    props : [],
    methods: {
      
    },
    created() {
        $('#myTab a').on('click', function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
    },
    template : `
    


    `
})