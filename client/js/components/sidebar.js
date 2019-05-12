Vue.component('sidebar', {
    template: 
    `<nav id="sidebar">
        <ul class="list-unstyled components">
            <div class="container d-flex flex-column mb-3" v-if="$root.isLogin">
                <div class="row justify-content-center">
                    <img alt="Profile Pic" class="avatar" src="img/user.png">
                </div>
                <div class="row justify-content-center mt-2">
                    <span>Andre</span>
                </div>
            </div>
            <li>
                <a href="#" onclick="app.page = 'explore'">Explore</a>
            </li>
            <div v-if="$root.isLogin">
            <li>
                <a href="#" onclick="app.page = 'createPost'">New Post</a>
            </li>
            <li>
                <a href="#" onclick="app.page = 'index'">Posts</a>
            </li>
            </div>
            <li>
                <a href="#">About</a>
            </li>
        </ul>
    </nav>`
})