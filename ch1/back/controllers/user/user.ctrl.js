/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const db = require('../../models');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const passport = require('passport');

const dotenv = require('dotenv');
dotenv.config(); //LOAD CONFIG

/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */
const query = `SELECT * FROM TB_USER`;
exports.get_products = async (_, res) => {
    let resultsVal = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    res.send(resultsVal);
};

exports.post_join = async (req, res, next) => {
    const { email, nickname, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.status(403).json({
                errorCode: 1,
                message: '이미 회원가입되어있습니다.',
            });
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nickname,
            password: hash,
        });
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (info) {
                return res.status(401).send(info.reason);
            }
            return req.login(user, async err => {
                // 세션에다 사용자 정보 저장 (어떻게? serializeUser)
                if (err) {
                    console.error(err);
                    return next(err);
                }
                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    attributes: ['id', 'email', 'nickname'],
                    include: [
                        {
                            model: db.Post,
                            attributes: ['id'],
                        },
                        {
                            model: db.User,
                            as: 'Followings',
                            attributes: ['id'],
                        },
                        {
                            model: db.User,
                            as: 'Followers',
                            attributes: ['id'],
                        },
                    ],
                });
                return res.json(fullUser);
            });
        })(req, res, next);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.post_login = async (req, res, next) => {
    // const { email, nickname, password } = req.body;
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (info) {
                return res.status(401).send(info);
            }

            return req.login(user, async err => {
                // 세션에다 사용자 정보 저장 (어떻게? serializeUser)
                if (err) {
                    console.error(err);
                    return next(err);
                }
                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    attributes: ['id', 'email', 'nickname'],
                    include: [
                        {
                            model: db.Post,
                            attributes: ['id'],
                        },
                        {
                            model: db.User,
                            as: 'Followings',
                            attributes: ['id'],
                        },
                        {
                            model: db.User,
                            as: 'Followers',
                            attributes: ['id'],
                        },
                    ],
                });
                return res.json(fullUser);
            });
        })(req, res, next);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.post_logout = (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        req.session.destroy(); // 선택사항
        return res.status(200).send('로그아웃 되었습니다.');
    }
};

exports.get_user = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.user.id, 10) },
            include: [
                {
                    model: db.Post,
                    as: 'Posts',
                    attributes: ['id'],
                },
                {
                    model: db.User,
                    as: 'Followings',
                    attributes: ['id'],
                },
                {
                    model: db.User,
                    as: 'Followers',
                    attributes: ['id'],
                },
            ],
            attributes: ['id', 'nickname'],
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.delete_follower = async (req, res, next) => {
    try {
        const me = await db.User.findOne({
            where: { id: req.user.id },
        });
        await me.removeFollower(req.params.id);
        res.send(req.params.id);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.get_follower = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: req.user.id },
        });
        const followers = await user.getFollowers({
            attributes: ['id', 'nickname'],
            limit: parseInt(req.query.limit || 3, 10),
            offset: parseInt(req.query.offset || 0, 10),
        });
        res.json(followers);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.get_followings = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: req.user.id },
        });
        const followings = await user.getFollowings({
            attributes: ['id', 'nickname'],
            limit: parseInt(req.query.limit || 3, 10),
            offset: parseInt(req.query.offset || 0, 10),
        });
        res.json(followings);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.patch_nickname = async (req, res, next) => {
    try {
        await db.User.update(
            {
                nickname: req.body.nickname,
            },
            {
                where: { id: req.user.id },
            },
        );
        res.send(req.body.nickname);
    } catch (e) {
        console.error(e);
        next(e);
    }
};

exports.delete_follow = async (req, res, next) => {
    try {
        const me = await db.User.findOne({
            where: { id: req.user.id },
        });
        await me.removeFollowing(req.params.id);
        res.send(req.params.id);
    } catch (e) {
        console.error(e);
        next(e);
    }
};

exports.post_follow = async (req, res, next) => {
    try {
        const me = await db.User.findOne({
            where: { id: req.user.id },
        });
        await me.addFollowing(req.params.id);
        res.send(req.params.id);
    } catch (e) {
        console.error(e);
        next(e);
    }
};

exports.get_posts = async (req, res, next) => {
    try {
        let where = {
            UserId: parseInt(req.params.id, 10),
            RetweetId: null,
        };
        if (parseInt(req.query.lastId, 10)) {
            where[db.Sequelize.Op.lt] = parseInt(req.query.lastId, 10);
        }
        const posts = await db.Post.findAll({
            where,
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
                    through: 'Like',
                    as: 'Likers',
                    attributes: ['id'],
                },
            ],
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
};

exports.get_user_id = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) },
            include: [
                {
                    model: db.Post,
                    as: 'Posts',
                    attributes: ['id'],
                },
                {
                    model: db.User,
                    as: 'Followings',
                    attributes: ['id'],
                },
                {
                    model: db.User,
                    as: 'Followers',
                    attributes: ['id'],
                },
            ],
            attributes: ['id', 'nickname'],
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
