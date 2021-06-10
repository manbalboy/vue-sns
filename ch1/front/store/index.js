export const state = () => ({});

export const mutations = {};

export const actions = {
    nuxtServerInit({ dispatch }) {
        return dispatch('users/loadUser');
    },
};
