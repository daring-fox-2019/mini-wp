Vue.component('dd-my-article', {
  data() {
    return {
      showCard: false
    };
  },
  
  template: `
  <div>
    <v-card class="mb-3">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      >
      </v-img>

      <v-card-title primary-title>
        <div>
          <div class="headline">Top western road trips</div>
          <span class="grey--text">Date Published</span>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="blue"><v-icon>edit</v-icon>Edit</v-btn>
        <v-btn flat color="red"><v-icon>delete</v-icon>Delete</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="showCard = !showCard">
          <v-icon>{{ showCard ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="showCard">
          <span class="grey--text">Author Name</span>
          <p>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </p>
        </v-card-text>
      </v-slide-y-transition>
      </v-card>
  </div>
  `
})