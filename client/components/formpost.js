Vue.component('form-post',{
    props:['islogin'],
    template: `<div class="col-9 bg-light">
    <div class="col-10 align-center">
        <div class="card my-15">
            <div class="card-body ">
                <form method="POST">
                    <input type="text" v-model="title" class="form-control mb-4"
                        placeholder="text your Title Here" autocomplete="off" autofocus>
                    <wysiwyg v-model="content" class="mb-4"></wysiwyg>
                    <div class="d-flex flex-row justify-content-end">
                        <input type="file" id="file" ref="file" class="form-control-file"
                          >
                        <button  class="btn btn-danger mx-2">cancel</button>
                        <button  type="submit" class="btn btn-success ">posting</button></div>
                </form>

            </div>
        </div>
    </div>
</div>`,
    data() {
        return {
            title:'',
            content:''
            
          
        }
    },
    methods: {
       
    }

})