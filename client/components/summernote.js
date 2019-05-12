Vue.component('summer-note', {
    props: ['edit','editMode'],
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
        },
        updateEdit() {
            return this.localEdit = ''
        }
    },
    created() {
        this.summernote.summernote({
            height: 250
        })
        if (this.editMode) {
            this.localEdit = this.edit
        } else {
            this.localEdit = ''
        }
    },
  
    mounted() {
        $(this.$refs.summernote).summernote({
            height: 250
          });
          if (!this.localEdit.content) {
            $('#summernote').summernote('code', '' )
          } else {
              $('#summernote').summernote('code', this.localEdit.content );
          }
      
    },
    beforeDestroy() {
        $('#summernote').summernote('code', '' );
        this.localEdit = ''
        this.$emit('edit-mode',false)   
        this.updateEdit()

    }
})