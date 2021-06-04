export const state = () => ({
    mainPosts: [],
    hasMorePost: true,
});

const totalPosts = 101;
const limit = 10;

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

    LOAD_POSTS(state) {
        const diff = totalPosts - state.mainPosts.length;
        const fakePosts = Array(diff > limit ? limit : diff)
            .fill()
            .map(() => ({
                id: Math.random().toString(),
                User: {
                    id: 1,
                    nickname: 'manbalboy',
                },
                content: `Hello infinity scrolling ${Math.random()}`,
                Comments: [],
                Images: [],
            }));
        state.mainPosts = state.mainPosts.concat(fakePosts);
        state.hasMorePost = fakePosts.length === limit;
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
    LOAD_POSTS(context) {
        if (context.state.hasMorePost) {
            context.commit('LOAD_POSTS');
        }
    },
};
