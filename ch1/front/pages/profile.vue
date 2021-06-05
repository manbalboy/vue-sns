<template>
    <div>
        <v-container>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader> 내 프로필 </v-subheader>
                    <v-form v-model="valid" @submit.prevent="onChangeNickname">
                        <v-text-field v-model="nickname" label="닉네임" required :rules="nicknameRules" />
                        <v-btn dark color="blue" type="submit"> 수정 </v-btn>
                    </v-form>
                </v-container>
            </v-card>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>팔로잉</v-subheader>
                    <follow-list :users="followingList" :remove="removeFollowing" />
                    <v-btn v-if="hasMoreFollowing" dark color="blue" style="width: 100%" @click="LOAD_FOLLOWINGS">
                        더보기
                    </v-btn>
                </v-container>
            </v-card>
            <v-card style="margin-bottom: 20px">
                <v-container>
                    <v-subheader>팔로워</v-subheader>
                    <follow-list :users="followerList" :remove="removeFollower" />
                    <v-btn v-if="hasMoreFollower" dark color="blue" style="width: 100%" @click="LOAD_FOLLOWERS"
                        >더보기</v-btn
                    >
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

        middleware: 'authenticated',

        data() {
            return {
                valid: false,
                nickname: '',
                nicknameRules: [v => !!v || '닉네임을 입력하세요'],
            };
        },

        fetch() {
            this.LOAD_FOLLOWERS();
            this.LOAD_FOLLOWINGS();
        },

        head() {
            return {
                title: 'profile',
            };
        },

        computed: {
            ...mapState('users', ['me', 'followerList', 'followingList', 'hasMoreFollowing', 'hasMoreFollower']),
        },

        watch: {
            me(value) {
                if (!value) {
                    this.$router.push({ path: '/' });
                }
            },
        },

        methods: {
            ...mapActions('users', ['REMOVE_FOLLOWER', 'REMOVE_FOLLOWING', 'LOAD_FOLLOWERS', 'LOAD_FOLLOWINGS']),
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
