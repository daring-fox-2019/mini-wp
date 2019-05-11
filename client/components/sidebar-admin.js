Vue.component('sidebar-admin', {
    props: [],
    template: `<div class="col-3 bg-white">
    <container>
        <ul class="text-dark scroll">
            <li class="row text-dark py-3 py-1">
                <a href="#" class="text-dark"><i class="fas fa-desktop mr-2 "></i>View Site</a>
            </li>
            <li class="row text-dark py-3 py-1">
                <a href="#" class="text-dark"><i class="fas fa-chart-bar mr-2"></i></i>chart</a>
            </li>
            <li class="row text-dark py-3 py-1">
                <a href="#" class="text-dark"><i class="fas fa-history mr-2"></i>Acivity</a>
            </li>
            <li class="row text-dark py-3 py-1">
                <a href="#" class="text-dark"><i class="fas fa-lightbulb mr-2 "></i>Plan</a>
            </li>
            <h6 class="my-1">Manage</h6>

            <li class="row text-dark py-3 py-1">
                <a href="#" class="text-dark"><i class="far fa-sticky-note mr-2"></i></i>Site Pages</a>
            </li>
            <li class="row text-dark py-3 py-1">
                <a href="#" class="text-dark"><i class="fas fa-align-left mr-2 "></i>Blog Posts </a>
            </li>
            <li class="row text-dark py-3 py-1">
                <a href="#" class="text-dark"><i class="far fa-images mr-2"></i></i>Media</a>
            </li>
            <li class="row text-dark py-3 py-1">
                <a href="#" class="text-dark"><i class="fas fa-comments mr-2 "></i>comments</a>
            </li>
            <li class="row text-dark py-3 py-1">
                <a href="#" class="text-dark"><i class="fas fa-plug mr-2 "></i>plugins</a>
            </li>
            <li class="row text-dark py-3 py-1">
                <a href="#" class="text-dark"><i class="fas fa-cloud-upload-alt mr-2 "></i>cloud</a>
            </li>
        </ul>

    </container>
</div>`
})