<template>
  <div class="home">
    <h1 class="subheading grey--text">posts</h1>
    <v-container class="my-5">
      <ImageCard></ImageCard>
    </v-container>
  </div>
</template>

<script>
import ImageCard from "@/components/ImageCard";
export default {
  data() {
    return {};
  },
  components: {
    ImageCard
  }
};
</script>
