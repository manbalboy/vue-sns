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

        async mounted() {
            const res = await axios.get('https://api.hnpwa.com/v0/news/1.json');
            this.test = res.data;
        },
    };
</script>

<style></style>
