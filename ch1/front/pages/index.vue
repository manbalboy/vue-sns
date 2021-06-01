<template>
    <v-container>
        <PostForm v-if="me" />
        <div>
            <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
        </div>
    </v-container>
</template>

<script>
    import PostCard from '@/components/PostCard';
    import PostForm from '@/components/PostForm';
    import { mapState } from 'vuex';
    export default {
        name: 'Index',
        components: {
            PostForm,
            PostCard,
        },
        head() {
            return {
                title: 'home',
            };
        },
        computed: {
            ...mapState('users', ['me']),
            ...mapState('posts', ['mainPosts']),
        },
    };
</script>

<style></style>
