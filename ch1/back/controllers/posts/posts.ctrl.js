/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */
const db = require('../../models');
const dotenv = require('dotenv');
dotenv.config(); //LOAD CONFIG

exports.post_posts = async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'nickname'],
                },
            ],
            order: [['create_at', 'DESC']],
            offset: parseInt(req.query.offset, 10) || 10,
            limit: parseInt(req.query.limit, 10) || 10,
        });
        return res.json(fullPost);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
