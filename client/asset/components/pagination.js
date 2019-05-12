Vue.component('pagination', {
    props : ['total', 'page', 'pos'],
    computed : {
        totalPage(){
            return Math.ceil(this.total/4)
        }
    },
    methods : {
        changePage(val){
            if(this.pos === 'publish'){
                this.$emit('change-page-publish', val)
            } else if(this.pos === 'main'){
                console.log('hehehehehe')
                console.log(val)
                this.$emit('change-page-main', val)
            } else if (this.pos === 'draft'){
                this.$emit('change-page-draft', val)
            }
            
        }
    },
    template : `
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" v-if="page-1 != 0 "><a class="page-link" href="" type="button" @click.prevent="changePage(page-1)">Previous</a></li>
            <li class="page-item" v-for="(number, i) in totalPage" :key="i"><a class="page-link"  type="button" href="" @click.prevent="changePage(i+1)">{{i+1}}</a></li>
            <li class="page-item" v-if="totalPage >= page+1"><a class="page-link" href="" type="button" @click.prevent="changePage(page+1)">Next</a></li>
        </ul>
    </nav>
    `
})