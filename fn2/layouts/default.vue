<template>
    <v-app>
        <nav>
            <v-toolbar dark color="green">
                <v-toolbar-title>
                    <nuxt-link to="/">NodeBird</nuxt-link>
                </v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                    <v-form @submit.prevent="onSearchHashtag">
                        <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
                            <v-text-field v-model="hashtag" label="검색" hide-details prepend-icon="mdi-magnify" />
                        </div>
                    </v-form>

                    <v-btn text nuxt to="/test7" :style="{ display: 'flex', alignItems: 'center' }">
                        <div>created setTimeout</div>
                    </v-btn>

                    <v-btn text nuxt to="/test5" :style="{ display: 'flex', alignItems: 'center' }">
                        <div>base setTimeout</div>
                    </v-btn>
                    <v-btn text nuxt to="/test4" :style="{ display: 'flex', alignItems: 'center' }">
                        <div>base</div>
                    </v-btn>
                    <v-btn text nuxt to="/test3" :style="{ display: 'flex', alignItems: 'center' }">
                        <div>asyncData setTimeout</div>
                    </v-btn>
                    <v-btn text nuxt to="/test2" :style="{ display: 'flex', alignItems: 'center' }">
                        <div>asyncData</div>
                    </v-btn>
                    <v-btn text nuxt to="/test6" :style="{ display: 'flex', alignItems: 'center' }">
                        <div>테스트fetch setTimeout</div>
                    </v-btn>
                    <v-btn text nuxt to="/test" :style="{ display: 'flex', alignItems: 'center' }">
                        <div>테스트fetch</div>
                    </v-btn>
                    <v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
                        <div>프로필</div>
                    </v-btn>
                    <v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center' }">
                        <div>회원가입</div>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <v-row no-gutters>
            <v-col cols="12" md="4">
                <login-form />
            </v-col>
            <v-col cols="12" md="8">
                <nuxt />
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
    import LoginForm from '~/components/LoginForm';
    export default {
        components: {
            LoginForm,
        },
        data() {
            return {
                hashtag: '',
            };
        },
        head() {
            return {
                title: 'NodeBird',
            };
        },
        methods: {
            onSearchHashtag() {
                this.$router.push({
                    path: `/hashtag/${encodeURIComponent(this.hashtag)}`,
                });
                this.hashtag = '';
            },
        },
    };
</script>

<style scoped>
    a {
        display: inline-block;
        text-decoration: none;
        color: inherit;
    }
</style>
