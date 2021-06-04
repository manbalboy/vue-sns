<template>
    <v-container v-if="post">
        <post-card :post="post" />
    </v-container>
    <div v-else> 해당 아이디의 게시글이 존재하지 않습니다. </div>
</template>

<script>
    import PostCard from '@/components/PostCard';
    import { mapState } from 'vuex';
    export default {
        name: 'Post',

        components: {
            PostCard,
        },

        computed: {
            ...mapState('posts', ['mainPosts']),
            post() {
                return this.mainPosts.find(v => v.id === parseInt(this.$route.params.id));
            },
        },
    };
</script>

<style scoped></style>
