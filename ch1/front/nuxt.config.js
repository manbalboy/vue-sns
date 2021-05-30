module.exports = {
    head: {
        titleTemplate: '%s - Nuxt.js',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },

            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            { hid: 'description', name: 'description', content: 'Meta description' },
        ],
    },
    // 서드파티 라이브러리 연결
    buildModules: ['@nuxtjs/vuetify', '@nuxtjs/axios'],
    module: [],
    vuetify: {},
};
