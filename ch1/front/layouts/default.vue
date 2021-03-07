<template>
<v-app>
  <nav>
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
  </nav>
  <v-row>
    <v-col cols="12" md="4">
      왼쪽
    </v-col>
    <v-col cols="12" md="8">
      오른쪽
    </v-col>
  </v-row>
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