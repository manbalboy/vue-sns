<template>
    <v-container>
        <PostForm v-if="me" />
        <div>
            <post-card />
            <post-card />
            <post-card />
            <post-card />
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
        },
    };
</script>

<style></style>
