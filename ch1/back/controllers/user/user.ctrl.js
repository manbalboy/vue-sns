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
            req.body.success = false;
            req.body.code = '200';
            req.body.message = '등록된 유저가 있습니다.';
            return res.json(req.body);
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nickname,
            password: hash,
        });
        req.body.success = true;
        req.body.code = '200';
        req.body.message = '성공';
        return res.json(req.body);
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
