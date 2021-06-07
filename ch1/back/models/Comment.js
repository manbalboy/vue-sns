const Sequelize = require('sequelize');
/**
 * @swagger
 *  components:
 *    schemas:
 *      TB_COMMENT:
 *        type: object
 *        required:
 *          - comment
 *        properties:
 *          comment:
 *            type: string
 *            description: 댓글
 *        example:
 *           comment: 댓글
 */
module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                    comment: '댓글',
                },
            },
            {
                sequelize,
                modelName: 'Comment',
                comment: '댓글',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            },
        );
    }

    static associate(db) {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    }
};
