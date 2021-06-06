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

            return req.login(user, err => {
                if (err) {
                    console.error(err);
                    return next(err);
                }
                return res.json(user);
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
        req.session.destroy();
    }

    return res.status(200).json({
        message: '로그아웃 되었습니다.',
    });
};

exports.get_user = (req, res) => {
    try {
        const user = req.user;

        delete user.password;

        res.json(user);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
