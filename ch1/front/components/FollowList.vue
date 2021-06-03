<template>
    <v-list>
        <v-list-item v-for="user in users" :key="user.id">
            <span>{{ user.nickname }}</span>
            <v-icon @click="remove(user.id)">mdi-minus-circle-outline</v-icon>
        </v-list-item>
    </v-list>
</template>

<script>
    export default {
        name: 'FollowList',

        props: {
            users: {
                type: Array,
                required: true,
            },
            remove: {
                type: Function,
                required: true,
            },
        },

        data() {
            return {
                // key: value,
            };
        },
    };
</script>

<style scoped></style>
