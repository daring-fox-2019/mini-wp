Vue.component('headlinecard', {
  props : [],
  methods: {
      
  },
  template : `<div style="border: none;" class="card mb-3">
  <img src="https://s3.amazonaws.com/checkli.com/checklists/590b9665cedf8.jpg"  class="card-img-top" alt="...">
  <div class="card-body">
    <h5 style="font-family: 'Abril Fatface', cursive; letter-spacing: 0.02em;"  class="text-left card-title">Judul Artikelnya</h5>
    <p style="font-family: 'Lato', sans-serif;"  class="text-left card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <div id="keterangan" class="">
          <div style="display:flex">
          <img src="https://data.whicdn.com/images/186036828/large.jpg" style="border-radius:50%; max-height:50px; max-width:50px;"  class="card-img-top" alt="foto user">
          <p style="font-family: 'Lato', sans-serif;"  class="ml-3 mt-2 text-muted">Nama usernya disini</p>
          </div>
    </div>
    <p class="card-text text-left"><small style="font-family: 'Lato', sans-serif;"  class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>`
})
