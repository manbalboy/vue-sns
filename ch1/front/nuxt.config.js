module.exports = {
    head: {
        title: 'NodeBird',
    },
    modules: ['@nuxtjs/axios'],
    buildModules: ['@nuxtjs/vuetify'],
    vuetify: {},
    axios: {
        browserBaseURL: 'http://java-coder.co.kr:18921',
        baseURL: 'http://java-coder.co.kr:18921',
        https: false,
    },
    server: {
        port: 3081,
    },
};
