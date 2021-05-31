export const state = () => ({
    mainPosts: [],
});

export const mutations = {
    PUSH_MAIN_POST(state, payload) {
        state.mainPosts.unshift(payload);
    },
};

export const actions = {
    ADD(context, payload) {
        context.commit('PUSH_MAIN_POST', payload);
    },
};
