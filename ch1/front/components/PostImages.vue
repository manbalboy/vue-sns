<template>
    <div v-if="images.length === 0"></div>
    <div v-else-if="images.length === 1">
        <v-img :src="`http://localhost:3085/${images[0].src}`" contain aspect-ratio="2" />
    </div>
    <div v-else-if="images.length === 2" style="display: flex">
        <v-img :src="`http://localhost:3085/${images[0].src}`" contain aspect-ratio="2" style="flex: 1" />
        <v-img :src="`http://localhost:3085/${images[1].src}`" contain aspect-ratio="2" style="flex: 1" />
    </div>
    <div v-else-if="images.length > 2" style="display: flex">
        <v-img :src="`http://localhost:3085/${images[0].src}`" contain aspect-ratio="2" style="flex: 1" />
        <div style="flex: 1; align-items: center; justify-content: center; display: flex">
            <v-icon>mdi-dot-horizontal</v-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PostImages',
        props: {
            images: {
                type: Array,
                required: true,
            },
        },
    };
</script>

<style scoped></style>
