const Sequelize = require('sequelize');
/**
 * @swagger
 *  components:
 *    schemas:
 *      TB_IMAGE:
 *        type: object
 *        required:
 *          - src
 *        properties:
 *          src:
 *            type: string
 *            description: 이미지경로
 *        example:
 *           src: http://localhost:8080/test.png
 */

module.exports = class Image extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                src: {
                    type: Sequelize.STRING(200),
                    allowNull: false, //필수
                    comment: '이미지경로',
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: 'Image',
                comment: '이미지 테이블',
                tableName: 'TB_IMAGE',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    static associate(db) {
        db.Image.belongsTo(db.Post);
    }
};
