Vue.component('summer-note', {
    template : `
    <textarea ref="summernote" id="summernote" />
    `,
    computed: {
        summernote() {
            return $(this.$refs.summernote);
        }
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
    },
    created() {
        this.summernote.summernote({
            height: 250
          })
    },
})