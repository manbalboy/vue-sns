<template>
    <div>
        <v-container>
            <v-card>
                <v-subheader>회원가입</v-subheader>
                <v-container>
                    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                        <v-text-field v-model="email" :rules="emailRules" label="이메일" type="email" required />
                        <v-text-field
                            v-model="password"
                            label="비밀번호"
                            type="password"
                            required
                            :rules="passwordRules"
                        />
                        <v-text-field
                            v-model="passwordCheck"
                            label="비밀번호확인"
                            type="password"
                            required
                            :rules="passwordCheckRules"
                        />
                        <v-text-field
                            v-model="nickname"
                            label="닉네임"
                            type="nickname"
                            required
                            :rules="nicknameRulse"
                        />
                        <v-checkbox
                            v-model="terms"
                            label="manbalboy 말을 잘 들을  것을 약속합니다."
                            required
                            :rules="termsRulse"
                        />
                        <v-btn color="green" type="submit"> 가입하기 </v-btn>
                    </v-form>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        // layout : 'admin',
        name: 'Signup',

        middleware: 'anonymous',
        data() {
            return {
                valid: false,
                email: '',
                password: '',
                passwordCheck: '',
                nickname: '',
                terms: false,
                emailRules: [v => !!v || '이메일은 필수입니다.', v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'],
                passwordRules: [v => !!v || '비밀번호는 필수입니다.'],
                passwordCheckRules: [
                    v => !!v || '비밀번호 확인은 필수 입니다.',
                    v => v === this.password || '비밀번호가 일치하지 않습니다.',
                ],

                nicknameRulse: [v => !!v || '닉네임은 필수 입니다.'],
                termsRulse: [v => !!v || '약관에 동의해야합니다.'],
            };
        },
        head() {
            return {
                title: 'signup',
            };
        },
        computed: {
            ...mapState('users', ['me']),
        },

        watch: {
            me(value) {
                if (value) {
                    this.$router.push({ path: '/' });
                }
            },
        },

        methods: {
            ...mapActions('users', ['SIGN_UP']),
            onSubmitForm() {
                if (this.$refs.form.validate()) {
                    this.SIGN_UP({ email: this.email, nickname: this.nickname })
                        .then(() => {
                            this.$router.push({ path: '/' });
                        })
                        .catch(() => {
                            console.log('회원가입 실패');
                        });
                } else {
                    console.log(this.valid);
                }
            },
        },
    };
</script>

<style></style>
