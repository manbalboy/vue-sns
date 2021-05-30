<template>
    <div>
        <v-container>
            <v-card>
                <v-subheader>회원가입</v-subheader>
                <v-container>
                    <v-form>
                        <v-text-field label="비밀번호" type="password" required />
                        <v-text-field label="비밀번호확인" type="password" required />
                        <v-text-field label="닉네임" type="nickname" required />
                        <v-checkbox label="manbalboy 말을 잘 들을 것을 약속합니다." required />
                        <v-btn color="green"> 가입하기 </v-btn>
                    </v-form>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        // layout : 'admin',
        name: 'Signup',
        head() {
            return {
                title: 'signup',
            };
        },
    };
</script>

<style></style>
