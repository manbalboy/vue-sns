export const state = () => ({
    me: null,
    followerList: [
        { id: 1, nickname: 'manbalboy' },
        { id: 2, nickname: 'sunjoong01' },
        { id: 3, nickname: 'manbalboy2' },
    ],
    followingList: [
        { id: 1, nickname: 'manbalboy' },
        { id: 2, nickname: 'sunjoong01' },
        { id: 3, nickname: 'manbalboy2' },
    ],
});

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
};

export const actions = {
    SIGN_UP(context, payload) {
        context.commit('SET_ME', payload);
    },

    LOGIN(context, payload) {
        context.commit('SET_ME', payload);
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
};
