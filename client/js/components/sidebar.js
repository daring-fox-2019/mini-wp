Vue.component('dd-sidebar', {
  props: ['drawerparent', 'user'],

  data() {
    return {
      drawer: this.drawerparent,
      items: [
        { title: 'Home', icon: 'home' },
        { title: 'My Articles', icon: 'short_text' },
      ],
      clouds: [
        { title: 'Storage', icon: 'storage' },
        { title: 'Drive', icon: 'keyboard' }
      ],
      accounts: [
        { title: 'Settings', icon: 'settings' },
        { title: 'Privacy and Account', icon: 'security' }
      ]
    };
  },

  watch: {
    drawerparent() {
      this.drawer = this.drawerparent;
    },
    drawer() {
      this.$emit('drawer');
    }
  },

  methods: {
    showMyArticles(foo) {
      this.$emit('show-my-articles', foo)
    }
  },
  
  template: `
  <div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="./assets/avatar.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ user }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="(item, i) in items"
          :key="item.title"
          @click="showMyArticles(i)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile
          v-for="cloud in clouds"
          :key="cloud.title"
          @click=""
        >
          <v-list-tile-action>
            <v-icon>{{ cloud.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ cloud.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile
          v-for="account in accounts"
          :key="account.title"
          @click=""
        >
          <v-list-tile-action>
            <v-icon>{{ account.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ account.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
  
  `
})