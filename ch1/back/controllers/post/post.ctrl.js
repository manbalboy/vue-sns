/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */
const db = require('../../models');
const dotenv = require('dotenv');
dotenv.config(); //LOAD CONFIG

exports.post_post = async (req, res, next) => {
    // POST /post
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
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
                        return db.Image.create({ src: image, PostId: newPost.id });
                        // newPost.addImages(images); 비효율적
                    }),
                );
            } else {
                await db.Image.create({ src: req.body.image, PostId: newPost.id });
            }
        }
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'nickname'],
                },
                {
                    model: db.Image,
                },
                {
                    model: db.User,
                    as: 'Likers',
                    attributes: ['id'],
                },
            ],
        });
        return res.json(fullPost);
    } catch (err) {
        console.error(err);
        next(err);
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
        const post = await db.Post.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: db.Post,
                    as: 'Retweet', // 리트윗한 게시글이면 원본 게시글이 됨
                },
            ],
        });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
            return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
        }
        const retweetTargetId = post.RetweetId || post.id;
        const exPost = await db.Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId,
            },
        });
        if (exPost) {
            return res.status(403).send('이미 리트윗했습니다.');
        }
        const retweet = await db.Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId, // 원본 아이디
            content: 'retweet',
        });
        const retweetWithPrevPost = await db.Post.findOne({
            where: { id: retweet.id },
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'nickname'],
                },
                {
                    model: db.User,
                    as: 'Likers',
                    attributes: ['id'],
                },
                {
                    model: db.Post,
                    as: 'Retweet',
                    include: [
                        {
                            model: db.User,
                            attributes: ['id', 'nickname'],
                        },
                        {
                            model: db.Image,
                        },
                    ],
                },
            ],
        });
        res.json(retweetWithPrevPost);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.delete_post = async (req, res, next) => {
    try {
        await db.Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.send('삭제했습니다.');
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.get_comments = async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id,
            },
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'nickname'],
                },
            ],
            order: [['createdAt', 'ASC']],
        });
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.post_comment = async (req, res, next) => {
    // POST /post/:id/comment
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
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
    } catch (err) {
        console.error(err);
        next(err);
    }
};
exports.delete_like = async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.removeLiker(req.user.id);
        res.json({ userId: req.user.id });
    } catch (e) {
        console.error(e);
        next(e);
    }
};

exports.post_like = async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.addLiker(req.user.id);
        res.json({ userId: req.user.id });
    } catch (e) {
        console.error(e);
        next(e);
    }
};
