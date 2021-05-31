export const state = () => ({
    me: null,
});

export const mutations = {
    SET_ME(state, payload) {
        state.me = payload;
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
};
