/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */
const db = require('../../models');
const dotenv = require('dotenv');
dotenv.config(); //LOAD CONFIG

exports.post_post = async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const newPost = await db.Post.create({
            ['user_id']: req.user.id,
            content: req.body.content,
        });

        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag =>
                    db.Hashtag.findOrCreate({
                        where: { name: tag.slice(1).toLowerCase() },
                    }),
                ),
            );
            await newPost.addHashtags(result.map(r => r[0]));
        }

        if (req.body.image) {
            if (Array.isArray(req.body.image)) {
                await Promise.all(
                    req.body.image.map(image => {
                        return db.Image.create({ src: image, ['post_id']: newPost.id });
                    }),
                );
            } else {
                await db.Image.create({ src: req.body.image, ['post_id']: newPost.id });
            }
        }

        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [
                { model: db.User, attributes: ['id', 'nickname'] },
                {
                    model: db.Image,
                },
            ],
        });

        return res.json(fullPost);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.post_images = async (req, res, next) => {
    try {
        return res.json(req.files.map(v => v.filename));
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.post_retweet = async (req, res, next) => {
    try {
        return res.json(req.files.map(v => v.filename));
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.delete_post = async (req, res, next) => {
    try {
        await db.Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.send('삭제완료');
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.get_comments = async (req, res, next) => {
    try {
        console.log('req >>>>>>>> ', req.params);
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comments = await db.Comment.findAll({
            where: {
                ['post_id']: req.params.id,
            },
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'nickname'],
                },
            ],
            order: [['create_at', 'ASC']],
        });
        return res.json(comments);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.post_comment = async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });

        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }

        const newComment = await db.Comment.create({
            ['post_id']: post.id,
            ['user_id']: req.user.id,
            content: req.body.content,
        });

        const comment = await db.Comment.findOne({
            where: {
                id: newComment.id,
            },
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'nickname'],
                },
            ],
        });

        return res.json(comment);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
