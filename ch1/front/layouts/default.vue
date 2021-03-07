<template>
<v-app>
  <div>
    <v-toolbar dark color="green">
      <v-toolbar-title>
        <nuxt-link to="/">NodeBird</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" :style="{display:'flex', alignItems : 'center'}"/>
        <v-btn text nuxt to="/profile">
          <div>프로필</div>
        </v-btn>
        <v-btn text nuxt to="/signup">
          <div>회원가입</div>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</v-app>
</template>

<script>
export default {
  // head() {
  //   return {
  //     title : 'ㅋㅋㅋ'
  //   }
  // }

}
</script>

<style scoped>

</style>