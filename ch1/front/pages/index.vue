<template>
  <div>
    <v-container>
      <post-card/>
      <post-card/>
      <post-card/>
      <post-card/>
    </v-container>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
export default {
  name: "index",
  head() {
    return {
      title : 'home'
    }
  },
  components :{
    PostCard
  }
}
</script>

<style>

</style>