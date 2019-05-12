Vue.component('tag', {
    props: ['tagz','size'],
    template: `
    <span>
        <button :style="{'height':'auto', 'fontSize': this.size+'px'||auto,'marginLeft':'3px', 'marginRight':'3px'}" class="badge badge-pill badge-secondary" @click="getTaggedArticle">{{ this.tagz }}</button>         
    </span>
    `,
    methods: {
        getTaggedArticle(){
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