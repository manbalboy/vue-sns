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
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
            console.log('1초');
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });

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
