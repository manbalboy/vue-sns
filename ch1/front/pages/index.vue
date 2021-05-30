<template>
    <div>
        <v-container>
            <post-card />
            <post-card />
            <post-card />
            <post-card />
        </v-container>
    </div>
</template>

<script>
    import PostCard from '@/components/PostCard';
    export default {
        name: 'Index',
        components: {
            PostCard,
        },
        head() {
            return {
                title: 'home',
            };
        },
    };
</script>

<style></style>
