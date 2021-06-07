/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const { Router } = require('express');
const { isNotLoggedIn, isLoggedIn } = require('../../middlewares.js');
const ctrl = require('./user.ctrl');

/**
 * @swagger
 * tags:
 * - name: "User"
 *   description: "Sign up, Sign in 구현"
 */

/**
 *
 * components:
 *   securitySchemes:
 *      BasicAuth:
 *          type: http
 *          scheme: basic
 *      BearerAuth:
 *          type: http
 *          scheme: bearer
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: X-API-Key
 *      cookieAuth:
 *          type: apiKey
 *          in: cookie
 *          name: connect.sid
 */

const router = Router();

router.get('/', isLoggedIn, ctrl.get_user);

router.get('/:id', ctrl.get_user_id);

/**
 * @swagger
 *  paths:
 *  /user:
 *    post:
 *      tags:
 *      - User
 *      description: 회원가입 API
 *      requestBody:
 *       required: true
 *       description: request body
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/TB_USER'
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: ok
 */
router.post('/', isNotLoggedIn, ctrl.post_join);

/**
 * @swagger
 *  paths:
 *  /user/login:
 *    post:
 *      tags:
 *      - User
 *      description: 로그인 API
 *      requestBody:
 *       required: true
 *       description: request body
 *       content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *           example:
 *              eamil: jh2001c12@gmail.com
 *              password: test123
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: ok
 */
router.post('/login', isNotLoggedIn, ctrl.post_login);

/**
 * @swagger
 *  paths:
 *  /user/logout:
 *    post:
 *      tags:
 *      - User
 *      description: Logout API
 *      security:
 *          - cookieAuth: []
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: ok
 */
router.post('/logout', ctrl.post_logout);

router.delete('/:id/follower', isLoggedIn, ctrl.delete_follower);

router.delete('/:id/follow', isLoggedIn, ctrl.delete_follow);

router.get('/:id/followers', isLoggedIn, ctrl.get_follower);

router.get('/:id/followings', isLoggedIn, ctrl.get_followings);

router.patch('/nickname', isLoggedIn, ctrl.patch_nickname);

router.post('/:id/follow', isLoggedIn, ctrl.post_follow);

router.get('/:id/posts', ctrl.get_posts);

module.exports = router;
