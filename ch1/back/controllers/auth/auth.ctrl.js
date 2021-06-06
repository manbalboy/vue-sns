/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const db = require('../../models');
const { QueryTypes } = require('sequelize');
// const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const redis = require('redis');
const { CODE_MESSAGE_TOKEN } = require('../../CONST_CODE_MESSAGE.js');

const dotenv = require('dotenv');
dotenv.config(); //LOAD CONFIG

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

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
    const { email, nick, password } = req.body;
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
            nick,
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

exports.post_token = async (req, res) => {
    try {
        const accessToken = jwt.sign(
            {
                email: req.body.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '10m', // 1분
                issuer: 'manbalboy',
            },
        );

        const refreshToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '14d', issuer: 'manbalboy' });
        client.set(req.body.email, refreshToken);

        res.cookie('access_token', accessToken, {
            // expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
            maxAge: 10 * 60 * 1000,
        });

        res.cookie('refresh_token', accessToken, {
            // expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
            maxAge: 60 * 60 * 24 * 14 * 1000,
        });

        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            success: true,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            code: 500,
            message: '서버 에러',
        });
    }
};

exports.post_login = (req, res, next) => {
    try {
        passport.authenticate('local', (authError, user, info) => {
            if (authError) {
                return next(authError);
            }

            if (!user) {
                console.log(info);
                return res.json({ code: 200, message: info.message, success: false });
            }

            return req.login(user, loginError => {
                if (loginError) {
                    return next(loginError);
                }
                // return res.redirect('/');
                return next();
            });
        })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            code: 500,
            success: false,
            message: '서버 에러',
        });
    }
};

exports.get_token = async (req, res) => {
    const returnObject = {
        success: true,
        code: 200,
        ...req.decoded,
    };

    res.json(returnObject);
};

exports.get_refreshToken = async (req, res) => {
    try {
        const { email } = jwt.decode(req.headers.autorization);
        let refreshTokenRedis = await getAsync(email);
        let refreshToken = req.headers['refresh-token'];

        if (!refreshTokenRedis) {
            const returnObject = {
                success: false,
                code: 'T503',
                message: CONST_CODE_MESSAGE.T503,
            };

            return res.json(returnObject);
        }

        if (!refreshToken) {
            const returnObject = {
                success: false,
                code: 'T504',
                message: CONST_CODE_MESSAGE.T504,
            };

            return res.json(returnObject);
        }

        if (refreshToken !== refreshTokenRedis) {
            const returnObject = {
                success: false,
                code: 'T505',
                message: CONST_CODE_MESSAGE.T505,
            };

            return res.json(returnObject);
        }

        jwt.verify(refreshTokenRedis, process.env.JWT_SECRET, function (error) {
            if (error) {
                if (error.name === 'TokenExpiredError') {
                    console.log(error);
                    // 유효기간 초과
                    return res.status(200).json({
                        code: 'T502',
                        success: false,
                        message: CODE_MESSAGE_TOKEN.T502,
                    });
                } else {
                    return res.status(200).json({
                        code: 'T501',
                        success: false,
                        message: CODE_MESSAGE_TOKEN.T501,
                    });
                }
            }
        });

        const accessToken = jwt.sign(
            {
                email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '10m', // 1분
                issuer: 'manbalboy',
            },
        );

        const returnObject = {
            success: true,
            code: 'T201',
            message: 'TOKEN 재발급',
            accessToken,
            refreshToken,
        };

        return res.json(returnObject);
    } catch (e) {
        const returnObject = {
            success: false,
            code: 200,
            message: e.message,
        };
        res.json(returnObject);
    }
};
