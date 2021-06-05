/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const { Router } = require('express');
const { isNotLoggedIn } = require('../../middlewares.js');
const ctrl = require('./user.ctrl');

/**
 * @swagger
 * tags:
 * - name: "User"
 *   description: "Sign up, Sign in 구현"
 */

const router = Router();

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
 *           $ref: '#/components/schemas/User'
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
 *      description: 회원가입 API
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

module.exports = router;
