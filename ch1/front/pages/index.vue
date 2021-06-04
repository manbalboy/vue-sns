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
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'Index',

        components: {
            PostForm,
            PostCard,
        },

        fetch() {
            this.LOAD_POSTS();
        },

        head() {
            return {
                title: 'home',
            };
        },

        computed: {
            ...mapState('users', ['me']),
            ...mapState('posts', ['mainPosts', 'hasMorePost']),
        },

        mounted() {
            window.addEventListener('scroll', this.onScroll);
        },

        beforeDestroy() {
            window.removeEventListener('scroll', this.onScroll);
        },
        methods: {
            ...mapActions('posts', ['LOAD_POSTS']),
            onScroll() {
                if (
                    window.scrollY + document.documentElement.clientHeight >=
                    document.documentElement.scrollHeight - 300
                ) {
                    if (this.hasMorePost) {
                        this.LOAD_POSTS();
                    }
                }
            },
        },
    };
</script>

<style></style>
