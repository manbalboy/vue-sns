<template>
    <div>
        <v-container>
            <div>
                {{ test }}
            </div>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        async asyncData() {
            const res = await axios.get('https://api.hnpwa.com/v0/news/1.json');
            return { test: res.data };
        },
        data() {
            return {
                test: '',
            };
        },
        head() {
            return {
                title: 'test2',
            };
        },
    };
</script>

<style></style>
