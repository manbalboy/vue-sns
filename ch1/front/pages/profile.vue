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
                    <follow-list :users="followingList" :remove="removeFollowing" />
                </v-container>
            </v-card>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>팔로워</v-subheader>
                    <follow-list :users="followerList" :remove="removeFollower" />
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import FollowList from '@/components/FollowList';
    import { mapState, mapActions } from 'vuex';
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

        computed: {
            ...mapState('users', ['followerList', 'followingList']),
        },

        methods: {
            ...mapActions('users', ['REMOVE_FOLLOWER', 'REMOVE_FOLLOWING']),
            removeFollower(id) {
                this.REMOVE_FOLLOWER({ id });
            },
            removeFollowing(id) {
                this.REMOVE_FOLLOWING({ id });
            },
            onChangeNickname() {
                this.$store.dispatch('users/CHANGE_NICKNAME', {
                    nickname: this.nickname,
                });
            },
        },
    };
</script>

<style scoped></style>
