<template>
    <div>
        여기는 어드민 페이지
        <div>
            <nuxt-link to="/">Home</nuxt-link>
            <nuxt-link to="/profile">profile</nuxt-link>
            <nuxt-link to="/signup">signup</nuxt-link>
            <nuxt-link to="/">z</nuxt-link>
        </div>
        <nuxt></nuxt>
    </div>
</template>

<script>
    import signup from '../pages/signup.vue';
    export default {
        comments: {
            signup,
        },
    };
</script>

<style scoped></style>
