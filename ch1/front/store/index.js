export const state = () => ({
    hello: 'vuex',
});

export const mutations = {
    bye(state) {
        state.hello = 'gg';
    },
};

export const actions = {
    nuxtServerInit({ dispatch }) {
        return dispatch('users/LOAD_USER');
    },
};
