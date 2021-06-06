const Sequelize = require('sequelize');

/**
 * @swagger
 *  components:
 *    schemas:
 *      TB_USER:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            description: Login id
 *          nick:
 *            type: string
 *            description: nick Name
 *          password:
 *            type: string
 *            description: password
 *          provider:
 *            type: string
 *            description: password
 *        example:
 *           email: manbalboy@hanmail.net
 *           nick: manbalboy
 *           password: test1234
 *           provider: local
 */
module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: false, //필수
                    unique: true,
                    comment: '고객 ID EMAIL',
                },
                nickname: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    comment: '고객 NICKNAME',
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    comment: '고객 PASSWORD',
                },
                provider: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                    defaultValue: 'local',
                    comment: '고객 유입 구분',
                },
                // snsId: {
                //     type: Sequelize.STRING(30),
                //     allowNull: true,
                // },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                comment: '고객테이블',
                modelName: 'User',
                tableName: 'TB_USER',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'TB_LIKE', as: 'Liked' });
        db.User.belongsToMany(db.User, { through: 'TB_FOLLOW', as: 'Followers', foreignKey: 'followingId' });
        db.User.belongsToMany(db.User, { through: 'TB_FOLLOW', as: 'Followings', foreignKey: 'followerId' });
    }
};
