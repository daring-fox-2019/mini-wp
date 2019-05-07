Vue.component('index', {
    template: 
    `<div class="container">
        <div class="row">
            <nav class="navbar">
                <a href="#" id="cat-publish" class="category-item active">PUBLISHED</a>
                <a href="#" id="cat-draft" class="category-item">DRAFT</a>
            </nav>
        </div>
        <div class="row mt-4">
            <postlist></postlist>
        </div>
    </div>
    `
})