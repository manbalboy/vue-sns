const Sequelize = require('sequelize');

/**
 * @swagger
 *  components:
 *    schemas:
 *      TB_HASHTAG:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *            description: 해시태그 네임
 *        example:
 *           name: #맛집
 */
module.exports = class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false, //필수
                    comment: '해시태그네임',
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: 'Hashtag',
                tableName: 'TB_HASHTAG',
                comment: '해시태그 테이블',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            },
        );
    }

    static associate(db) {
        db.Hashtag.belongsToMany(db.Post, { through: 'TB_POST_HASHTAG' });
    }
};
