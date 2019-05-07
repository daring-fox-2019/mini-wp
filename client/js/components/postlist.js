Vue.component('postlist', {
    data() {
        return {
            posts: [
                {
                    _id: 1,
                    title: 'post 1',
                    content: `bla bla bla`,
                    createdat: '2019-02-11',
                    tags: ['fun', 'day']
                },
                {
                    _id: 2,
                    title: 'post 2 tentang computer',
                    content: `<h3>testing rich text editor</h3>`,
                    createdat: '2019-04-22',
                    tags: ['computer', 'javascript']
                },
                {
                    _id: 3,
                    title: 'apakah post itu',
                    content: `<h3>title nya apakah itu</h3> <p>maksudnya apa ya</p>`,
                    createdat: '2019-02-11',
                    tags: ['fun', 'day']
                },
            ]
        }
    },
    template: 
    `<div class="list-group post-list">
        <postitemcard v-for="post in posts" :post="post"></postitemcard>
    </div>`
})