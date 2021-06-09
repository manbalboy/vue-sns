module.exports = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express Service with Swagger',
            version: '1.0.0',
            description: 'a Rest api using swagger and express.',
        },
        host: 'java-coder.co.kr:18921',
        basePath: '/',
        schemes: ['http'],
    },
    apis: ['./models/*.js', './controllers/**/*.js'],
};
