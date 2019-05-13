Vue.component('NavbarNav', {
  props: ['isLoggedIn', 'page'],
  data: function () {
    return {}
  },
  template: `
    <ul class="navbar-nav ml-auto">
      <template v-if="isLoggedIn">
        <li class="nav-item mr-4">
          <a class="nav-link btn btn-success text-light px-4 btn-sm" href="#" @click.prevent="$emit('click', 'form-article')" v-if="page !== 'form-article'"><i class="fa fa-plus"></i> Article</i></a>
          <a class="nav-link" href="#" @click.prevent="$emit('click', 'list-article')" v-else>Articles</i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="$emit('click', 'logout')">Logout</a>
        </li>
      </template>
      <template v-else>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="$emit('click', 'register')">Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="$emit('click', 'login')">Login</a>
        </li>
      </template>
    </ul>
  `
})
