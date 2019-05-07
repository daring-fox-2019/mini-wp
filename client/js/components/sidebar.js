Vue.component('sidebar', {
    template: 
    `<nav id="sidebar">
        <ul class="list-unstyled components">
            <div class="container d-flex flex-column mb-3">
                <div class="row justify-content-center">
                    <img alt="Profile Pic" class="avatar" src="img/user.png">
                </div>
                <div class="row justify-content-center mt-2">
                    <span>Andre</span>
                </div>
            </div>
            <li>
                <a href="#">Explore</a>
            </li>
            <li>
                <a href="#" onclick="showCreatePost()">New Post</a>
            </li>
            <li>
                <a href="#" onclick="showUpdatePost()">Update Post</a>
            </li>
            <li>
                <a href="#" onclick="showIndex()">Posts</a>
            </li>
            <li>
                <a href="#">About</a>
            </li>
        </ul>
    </nav>`
})