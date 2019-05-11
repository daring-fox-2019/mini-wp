Vue.component('tag', {
    props: ['tag'],
    template:
    `<span class="badge badge-info">{{tag.text}}</span>`
})