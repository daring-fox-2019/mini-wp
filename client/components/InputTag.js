Vue.component('InputTag', {
  props: ['tags'],
  data: function () {
    return {
      edit: false,
      name: ''
    }
  },
  watch: {
    tags: function (val) {
      this.name = val.map(t => t.name).join(', ')
    },
    name: function (val) {
      !(val[val.length - 1] === ',' || val[val.length - 1] === ' ') && this.$emit('change', val)
    }
  },
  methods: {
    handleClickInputTag: function () {
      this.edit = true
    },
    handleInputBlur: function () {
      this.edit = false
    },
    handleClickDeleteTag: function (index) {
      let names = this.name.split(',').map(t => t.trim())
      names.splice(index, 1)
      this.name = names.join(', ')
    }
  },
  template: `
    <div @click.prevent="handleClickInputTag">
      <a href="#" v-if="!tags.length && !edit" class="text-secondary">Click here to add new tag</a>
      <div v-show="!edit">
        <button v-for="(tag, i) in tags" :key="i" class="btn btn-sm btn-info mr-1 mb-1" type="button" @click.stop="handleClickDeleteTag(i)">
          {{ tag.name }}
          <i class="fa fa-close"></i>
        </button>
      </div>
      <input type="text" class="form-control" ref="input-tag" v-model="name" v-show="edit" @blur="handleInputBlur">
    </div>
  `
})
