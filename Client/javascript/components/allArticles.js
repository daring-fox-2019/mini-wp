Vue.component('all-article-card', {
    props: ['articlecomponent'],
    data() {
        return {}
    },
    methods: {},
    template: `
        <div class="card">
            <div class="card-body" style="background-color: #F1E7FE;">
                <img v-bind:src="articlecomponent.image" style="height: 250px; width: 100%;">
                <h5 style="font-weight: bold;" class="card-title">{{ articlecomponent.title }}</h5>
                <h6>{{ articlecomponent.createdAt }}</h6>
                <p class="card-text" v-html="articlecomponent.content"></p>
                <h6 style="font-style: italic;font-weight: bold;">Written by: {{ articlecomponent.user.name }}</h6>
                <ul class="tags" v-for="tag in articlecomponent.tags">
                    <li>{{ tag }}</li>
                </ul>
            </div>
        </div>
    `
})