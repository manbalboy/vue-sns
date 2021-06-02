<template>
    <div>
        <v-container>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader> 내 프로필 </v-subheader>
                    <v-form v-model="valid" @submit.prevent="onChangeNickname">
                        <v-text-field v-model="nickname" label="닉네임" required :rules="nicknameRules" />
                        <v-btn color="blue" type="submit"> 수정 </v-btn>
                    </v-form>
                </v-container>
            </v-card>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>팔로잉</v-subheader>
                    <follow-list />
                </v-container>
            </v-card>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>팔로워</v-subheader>
                    <follow-list />
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import FollowList from '@/components/FollowList';
    export default {
        name: 'Profile',
        components: {
            FollowList,
        },
        data() {
            return {
                valid: false,
                nickname: '',
                nicknameRulesL: [v => !!v || '닉네임을 입력하세요'],
            };
        },
        head() {
            return {
                title: 'profile',
            };
        },

        methods: {
            onChangeNickname() {
                this.$store.dispatch('users/CHANGE_NICKNAME', {
                    nickname: this.nickname,
                });
            },
        },
    };
</script>

<style scoped></style>
