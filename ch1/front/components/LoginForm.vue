<template>
    <v-container v-if="!me">
        <v-card>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-container>
                    <v-text-field v-model="email" label="이메일" type="email" required :rules="emailRules" />
                    <v-text-field v-model="password" label="비밀번호" :rules="passwordRules" type="password" required />
                    <v-btn color="green" type="submit">로그인</v-btn>
                    <v-btn nuxt to="/signup">회원가입</v-btn>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
    <v-container v-else>
        <v-card>
            <v-container>
                {{ me.nickname }}님이 로그인 되었습니다.
                <v-btn @click="LOGOUT"> 로그아웃 </v-btn>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'LoginForm',
        data() {
            return {
                email: '',
                password: '',
                valid: false,
                emailRules: [v => !!v || '이메일은 필수입니다.', v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'],
                passwordRules: [v => !!v || '비밀번호는 필수입니다.'],
            };
        },

        computed: {
            ...mapState('users', ['me']),
        },

        methods: {
            ...mapActions('users', ['LOGIN', 'LOGOUT', 'LOAD_USER']),
            onSubmitForm() {
                if (this.$refs.form.validate()) {
                    this.LOGIN({ email: this.email, password: this.password, nickname: this.nickname });
                } else {
                    console.log(this.valid);
                }
            },
        },
    };
</script>

<style scoped></style>
