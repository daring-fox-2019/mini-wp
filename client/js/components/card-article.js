Vue.component("card-article",{
  props: ["article"],
  data() {
    return {
      title: '',
      subtitle: ''
    }
  },
  template : `
  <div>
  <b-card
                        class="mb-3"
                        :title=article.title
                        :sub-title="article.author"
                      >
                      <div class="row">
                        <div class="col col-md-3">
                          <b-card-img :src="article.image" class="rounded-0" style="object-fit:cover"></b-card-img>

                        </div>
                        <div class="col col-md">
                          <div style="max-height:70px;overflow:hidden">
                            <p v-html="article.content"></p>
                          </div>
                          <slot></slot>
                        </div>
</b-card>
</div>`,
})