Vue.component('summer-note', {
    props: ['edit'],
    data(){
        return {
            localEdit : ''
        }
    },
    template : `
    <div>
    <textarea ref="summernote" id="summernote"></textarea>
    </div>
    `,
    computed: {
        summernote() {
            return $(this.$refs.summernote);
        },  
    },
    methods: {
        getVal() {
            let data = $(this.$refs.summernote).summernote('code');
            return data
        },
        run(code, value) {
            if (value == undefined) {
                $(this.$refs.summernote).summernote(code)
            } else {
                $(this.$refs.summernote).summernote(code, value)
            }
        }
    },
    mounted() {
        $(this.$refs.summernote).summernote({
            height: 250
          });
          $('#summernote').summernote('code', this.localEdit.content );
      
    },
    created() {
        this.summernote.summernote({
            height: 250
        })
        this.localEdit = this.edit
    },
})