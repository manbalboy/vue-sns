/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const { Router } = require('express');
const { isNotLoggedIn, verifyToken } = require('../../middlewares.js');
const ctrl = require('./auth.ctrl');

/**
 * @swagger
 * tags:
 * - name: "Auth"
 *   description: "Login, Logout, Join 등과 같은 인증 관련"
 */

const router = Router();
router.use((req, res, next) => {
    res.commonObj = {
        success: true,
        code: 200,
    };
    next();
});

/**
 * @swagger
 *  paths:
 *  /auth/join:
 *    post:
 *      tags:
 *      - Auth
 *      description: 회원가입 API
 *      requestBody:
 *       required: true
 *       description: request body
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: ok
 */
router.post('/join', isNotLoggedIn, ctrl.post_join);

/**
 * @swagger
 *  paths:
 *  /auth/login:
 *    post:
 *      tags:
 *      - Auth
 *      description: 로그인 API
 *      requestBody:
 *       required: true
 *       description: request body
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: ok
 */
router.post('/login', isNotLoggedIn, ctrl.post_login, ctrl.post_token);

/**
 * @swagger
 *  paths:
 *  /auth/token:
 *    post:
 *      tags:
 *      - Auth
 *      description: 토큰 발행 API
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: ok
 */
router.post('/token', ctrl.post_token);

/**
 * @swagger
 *  paths:
 *  /auth/token:
 *    get:
 *      tags:
 *      - Auth
 *      description: access-token 유효성검사
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: "autorization"
 *        in: "header"
 *      responses:
 *       200:
 *        description: ok
 */
router.get('/token', verifyToken, ctrl.get_token);

/**
 * @swagger
 *  paths:
 *  /auth/refreshToken:
 *    get:
 *      tags:
 *      - Auth
 *      description: access-token 재발행
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: "autorization"
 *        in: "header"
 *      - name: "refresh-token"
 *        in: "header"
 *      responses:
 *       200:
 *        description: ok
 */
router.get('/refreshToken', ctrl.get_refreshToken);

module.exports = router;
