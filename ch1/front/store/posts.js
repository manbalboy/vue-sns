export const state = () => ({
    mainPosts: [],
    hasMorePost: true,
    imagePaths: [],
});

// const totalPosts = 101;
const limit = 10;

export const mutations = {
    PUSH_MAIN_POST(state, payload) {
        state.mainPosts.unshift(payload);
        state.imagePaths = [];
    },

    REMOVE_MAIN_POST(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);

        state.mainPosts.splice(index, 1);
    },

    ADD_COMMENT(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Comments.unshift(payload);
    },

    LOAD_COMMENTS(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Comments = payload;
    },

    LOAD_POSTS(state, payload = []) {
        console.log('fdsfsd', payload);
        state.mainPosts = state.mainPosts.concat(payload);
        state.hasMorePost = (payload.length || 0) === limit;
    },

    CONCAT_IMAGE_PATHS(state, payload) {
        state.imagePaths = state.imagePaths.concat(payload);
    },

    REMOVE_IMAGE_PATH(state, payload) {
        state.imagePaths.splice(payload, 1);
    },
};

export const actions = {
    ADD(context, payload) {
        console.log('dddd> ', payload);
        this.$axios
            .post(
                'http://localhost:3085/post',
                {
                    content: payload.content,
                    image: context.state.imagePaths,
                },
                { withCredentials: true },
            )
            .then(res => {
                context.commit('PUSH_MAIN_POST', res.data);
            })
            .catch(() => {});
    },

    REMOVE(context, payload) {
        this.$axios
            .delete(`http://localhost:3085/post/${payload.postId}`, { withCredentials: true })
            .then(() => {
                context.commit('REMOVE_MAIN_POST', payload);
            })
            .catch(() => {});
    },

    ADD_COMMENT(context, payload) {
        this.$axios
            .post(
                `http://localhost:3085/post/${payload.postId}/comment`,
                {
                    content: payload.content,
                },
                { withCredentials: true },
            )
            .then(res => {
                context.commit('ADD_COMMENT', res.data);
            })
            .catch(() => {});
    },

    LOAD_COMMENTS(context, payload) {
        this.$axios
            .get(`http://localhost:3085/post/${payload.postId}/comments`)
            .then(res => {
                context.commit('LOAD_COMMENTS', res.data);
            })
            .catch(() => {});
    },

    LOAD_POSTS(context) {
        if (context.state.hasMorePost) {
            this.$axios
                .get(`http://localhost:3085/posts?offset=${context.state.mainPosts.length}&limit=10`)
                .then(res => {
                    context.commit('LOAD_POSTS', res.data);
                })
                .catch(() => {});
        }
    },
    UPLOAD_IMAGES(context, payload) {
        this.$axios
            .post('http://localhost:3085/post/images', payload, {
                withCredentials: true,
            })
            .then(res => {
                context.commit('CONCAT_IMAGE_PATHS', res.data);
            })
            .catch(() => {});
    },
};
