Vue.component('tag', {
    props: ['tagz'],
    template: `
    <span>
        <button style="margin-left:3px; margin-right:3px" class="badge badge-pill badge-success" @click="getTaggedArticle">{{ this.tagz }}</button>         
    </span>
    `,
    methods: {
        getTaggedArticle(){
            console.log(this.tagz)
            axios
            .get(serverUrl+"/"+this.tagz,{
                headers: {auth:localStorage.jwtoken}
            })
            .then(({data}) => {
                this.$emit('foundbytag',data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})