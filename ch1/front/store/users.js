export const state = () => ({
    me: null,
    followerList: [],
    followingList: [],

    hasMoreFollower: true,
    hasMoreFollowing: true,
});

const totalFollowers = 8;
const totalFollowing = 9;

const limit = 3;

export const mutations = {
    SET_ME(state, payload) {
        state.me = payload;
    },

    CHANGE_NICKNAME(state, payload) {
        state.me['nickname'] = payload.nickname;
    },

    ADD_FOLLOWING(state, payload) {
        state.followingList.push(payload);
    },

    ADD_FOLLOWER(state, payload) {
        state.followerList.push(payload);
    },

    REMOVE_FOLLOWING(state, payload) {
        const index = state.followingList.findIndex(v => v.id === payload.id);
        state.followingList.splice(index, 1);
    },

    REMOVE_FOLLOWER(state, payload) {
        const index = state.followerList.findIndex(v => v.id === payload.id);
        state.followerList.splice(index, 1);
    },

    LOAD_FOLLOWERS(state) {
        const diff = totalFollowers - state.followerList.length;
        const fakeUsers = Array(diff > limit ? limit : diff)
            .fill()
            .map(() => ({
                id: Math.random().toString(),
                nickname: Math.floor(Math.random() * 10000),
            }));
        state.followerList = state.followerList.concat(fakeUsers);
        state.hasMoreFollower = fakeUsers.length === limit;
    },

    LOAD_FOLLOWINGS(state) {
        const diff = totalFollowing - state.followingList.length;
        const fakeUsers = Array(diff > limit ? limit : diff)
            .fill()
            .map(() => ({
                id: Math.random().toString(),
                nickname: Math.floor(Math.random() * 10000),
            }));
        state.followingList = state.followingList.concat(fakeUsers);
        state.hasMoreFollowing = fakeUsers.length === limit;
    },
};

export const actions = {
    SIGN_UP(context, payload) {
        console.log('SIGN_UP', payload);
        this.$axios
            .post('http://localhost:3085/user', {
                email: payload.email,
                nickname: payload.nickname,
                password: payload.password,
            })
            .then(res => {
                context.commit('SET_ME', res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },

    LOGIN(context, payload) {
        this.$axios
            .post(
                'http://localhost:3085/user/login',
                {
                    email: payload.email,
                    nickname: payload.nickname,
                    password: payload.password,
                },
                { withCredentials: true },
            )
            .then(res => {
                context.commit('SET_ME', res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },

    LOGOUT(context) {
        context.commit('SET_ME', null);
    },

    CHANGE_NICKNAME(context, payload) {
        context.commit('CHANGE_NICKNAME', payload);
    },

    ADD_FOLLOWING(context, payload) {
        context.commit('ADD_FOLLOWING', payload);
    },

    ADD_FOLLOWER(context, payload) {
        context.commit('ADD_FOLLOWER', payload);
    },

    REMOVE_FOLLOWING(context, payload) {
        context.commit('REMOVE_FOLLOWING', payload);
    },

    REMOVE_FOLLOWER(context, payload) {
        context.commit('REMOVE_FOLLOWER', payload);
    },

    LOAD_FOLLOWINGS(context) {
        if (context.state.hasMoreFollowing) {
            context.commit('LOAD_FOLLOWINGS');
        }
    },
    LOAD_FOLLOWERS(context) {
        if (context.state.hasMoreFollower) {
            context.commit('LOAD_FOLLOWERS');
        }
    },
};
