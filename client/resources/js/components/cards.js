Vue.component('article-card', {
  props: ['filtered-items'],
  data() {
    return {
    }
  },
  methods: {
    changeId(id) {
      this.$emit('change-id', id)
    },
    selectTag(tag) {
      this.$emit('view-tag', tag)
    }
  },
  template: `
  <div class="row ml-1">
    <div v-for="(item, index) in filteredItems" :key="index" class="col-3 p-2">
      <div class="card col-12">
        <img data-toggle="modal" data-target="#modal-view-img"
          :src="item.featuredImg" style="cursor: pointer;"
          class="card-img-top" alt="Article Picture" @click.prevent="changeId(item._id)">
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><h5 class="card-title">{{ item.title }}</h5></li>
          <li class="list-group-item text-truncate" v-html="item.content"></li>
          <li class="list-group-item">{{ item.created }}</li>
          <li class="list-group-item">
            <a style="cursor: pointer; color: white;" class="badge badge-primary mr-1" v-for="(tag, index) in item.tags"
            @click.prevent="selectTag(tag)">{{tag}}</a>
            <div v-if="item.tags.length < 1"><span class="badge badge-secondary">No Tag</span></div>
          </li>
          <li class="list-group-item"> {{ item.author.name }}</li>
        </ul>
        <div class="card-body">
          <button type="button" class="btn btn-primary col-12" data-toggle="modal" data-target="#modalView"
            @click="changeId(item._id)">
            View
          </button>
        </div>
      </div>
    </div>
  </div>
  `
})