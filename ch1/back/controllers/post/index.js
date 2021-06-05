/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const { Router } = require('express');
const ctrl = require('./post.ctrl');

/**
 * @swagger
 * tags:
 * - name: "Post"
 *   description: "post 관련 API"
 */

const router = Router();

/**
 * @swagger
 *  paths:
 *  /post:
 *    post:
 *      tags:
 *      - POST
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
router.post('/', ctrl.post_post);

module.exports = router;
