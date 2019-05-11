Vue.component('tag-badge', {
    props: ['tag'],
    template:
    `<span class="badge badge-info">{{tag.text}}</span>`
})