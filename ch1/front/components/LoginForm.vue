<template>
    <v-container>
        <v-card>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-container>
                    <v-text-field label="이메일" type="email" required :rules="emailRules" />
                    <v-text-field label="비밀번호" :rules="passwordRules" type="password" required />
                    <v-btn color="green" type="submit">로그인</v-btn>
                    <v-btn nuxt to="/signup">회원가입</v-btn>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'LoginForm',
        data() {
            return {
                valid: false,
                emailRules: [v => !!v || '이메일은 필수입니다.', v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'],
                passwordRules: [v => !!v || '비밀번호는 필수입니다.'],
            };
        },

        methods: {
            onSubmitForm() {
                if (this.$refs.form.validate()) {
                    alert('회원가입');
                } else {
                    console.log(this.valid);
                }
            },
        },
    };
</script>

<style scoped></style>
