Vue.component('ListArticle', {
  props: ['login', 'articles'],
  data: function () {
    return {

    }
  },
  mounted: function () {
    this.$emit('mounted')
  },
  methods: {
    moment: function (date) {
      return moment(date)
    }
  },
  template: `
    <div class="container">
      <p v-if="!articles.length" class="mt-5 text-secondary">No article yet.</p>
      <div class="bg-white pt-4" v-for="(article, i) in articles" :key="i" v-else>
        <div class="row justify-content-center mt-5">
          <div class="col-8 px-3 mt-4">
            <div class="text-center mb-3">
              <div class="text-left" style="position: absolute; top: 0; right: -80px;" v-if="login.user._id === article.authorId._id">
                <div>
                  <a
                    href="#"
                    class="text-muted"
                    @click.prevent="$emit('click-edit', article._id)"
                    ><i class="fa fa-edit"></i> Edit</a
                  >
                </div>
                <div>
                  <a
                    href="#"
                    class="text-muted"
                    @click.prevent="$emit('click-delete', article._id)"
                    ><i class="fa fa-trash"></i> Delete</a
                  >
                </div>
              </div>
              <h4 style="line-height: 1em; letter-spacing: 0.1em;">
                {{ article.title }}
              </h4>
              <small
                class="text-secondary"
                style="line-height: 1em; letter-spacing: 0.1em;"
                >Posted by <span class="text-dark">{{ article.authorId.email }}</span> on <span class="text-dark">{{ moment(article.createdAt).format('LL') }}</span></small
              >
            </div>
            <figure class="mb-5">
              <img
                :src="article.coverImg.path.replace('https', 'http')"
                class="img-fluid"
                style="width: 100%; max-height:280px"
              />
              <p class="text-right">
                <a href="#" @click.prevent="$emit('click-tag', tag.name)" class="badge" v-for="(tag, i) in article.tags">{{
                  tag.name
                }}</a>
              </p>
            </figure>
            <span v-html="article.body"></span>
          </div>
        </div>
        <hr class="my-5" />
      </div>
    </div>
  `
})
