<template>
    <div>
        <p>test fetch</p>
        <v-container>
            {{ test }}
        </v-container>
    </div>
</template>

<script>
    export default {
        async fetch({ store }) {
            return await store.dispatch('users/test');
        },
        head() {
            return {
                title: 'test',
            };
        },
        computed: {
            test() {
                return this.$store.state.users.test;
            },
        },
    };
</script>

<style></style>
