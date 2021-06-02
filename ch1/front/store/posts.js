export const state = () => ({
    mainPosts: [],
});

export const mutations = {
    PUSH_MAIN_POST(state, payload) {
        state.mainPosts.unshift(payload);
    },
    REMOVE_MAIN_POST(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.id);

        state.mainPosts.splice(index, 1);
    },
    ADD_COMMENT(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Comments.unshift(payload);
    },
};

export const actions = {
    ADD(context, payload) {
        context.commit('PUSH_MAIN_POST', payload);
    },

    REMOVE(context, payload) {
        context.commit('REMOVE_MAIN_POST', payload);
    },

    ADD_COMMENT(context, payload) {
        context.commit('ADD_COMMENT', payload);
    },
};
