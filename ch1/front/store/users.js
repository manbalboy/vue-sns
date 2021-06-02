export const state = () => ({
    me: null,
});

export const mutations = {
    SET_ME(state, payload) {
        state.me = payload;
    },
    CHANGE_NICKNAME(state, payload) {
        state.me['nickname'] = payload.nickname;
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
};
