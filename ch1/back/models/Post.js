const Sequelize = require('sequelize');

/**
 * @swagger
 *  components:
 *    schemas:
 *      TB_POST:
 *        type: object
 *        required:
 *          - content
 *        properties:
 *          content:
 *            type: string
 *            description: content 정보 이모티콘 포함
 *        example:
 *           content: 안녕하세요 manbalboy입니다.
 */
/**
 * @swagger
 *  components:
 *    schemas:
 *      TB_POST_HASHTAG:
 *        type: object
 *        required:
 *          - content
 *        properties:
 *          content:
 *            type: string
 *            description: content 정보 이모티콘 포함
 *        example:
 *           content: 안녕하세요 manbalboy입니다.
 */
module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false, //필수
                    comment: '게시글',
                },
                // ['user_id']: {
                //     type: Sequelize.INTEGER,
                //     allowNull: false, // 모델 간 관계 설정 \
                //     references: {
                //         model: 'User', //user모델의 primery key를 강제로 참조함.
                //         key: 'user_id', //foreign key를 'user_id'로 설정
                //     },
                // },
            },
            {
                sequelize,
                modelName: 'Post',
                comment: '게시글 테이블',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            },
        );
    }

    static associate(db) {
        db.Post.belongsTo(db.User); // UserId
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); // RetweetId
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    }
};
