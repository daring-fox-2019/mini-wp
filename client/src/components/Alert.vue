<template>
  <div>
    <v-alert v-model="alert" dismissible :type="alertType">{{message}}</v-alert>

    <div class="text-xs-center">
      <v-btn v-if="!alert" color="primary" dark @click="alert = true">Reset</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: true
    };
  },
  props: {
    alertType: String,
    message: String
  }
};
</script>
