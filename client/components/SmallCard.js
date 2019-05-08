Vue.component('smallcard', {
    props : [],
    methods: {
      
    },
    template : `
 <div  class="card mb-3" style="border: none; max-width: 340px; max-height:150px">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="https://i.pinimg.com/originals/d9/e6/2b/d9e62b887dc353b9ce765f2497f62247.jpg" class="mt-3 align-middle card-img" alt="hehe">
    </div>
    <div style="display:inline;"  class="col-md-8">
      <div class="card-body">
        <h6 style="font-weight:400; font-family: 'Abril Fatface', cursive; letter-spacing: 0.02em;"  class="card-title">Card title</h6>
        <p style="font-family: 'Habibi', serif;" class="text-muted">Nama penulis in Tag </p>
        <p style="font-family: 'Habibi', serif;" class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>`
})