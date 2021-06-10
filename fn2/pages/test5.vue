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

            console.log('1초');
            const res = await axios.get('https://api.hnpwa.com/v0/news/1.json');
            this.test = res.data;
        },
    };
</script>

<style></style>
