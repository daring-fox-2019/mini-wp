Vue.component('dd-tag', {
  props: ['tag'],

  data() {
    return {
      
    };
  },

  template: `
  <div>
    <v-chip label color="green" text-color="white">
      <v-icon left>label</v-icon><a @click="$emit('search')" style="color:white">{{ tag }}
    </v-chip>
  </div>
  `
})